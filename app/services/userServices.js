const userRepository = require("../repositories/userRepository");
const { encryptPassword, checkPassword, createToken } = require("../utils/authUtils");
const cloudinary = require("../utils/cloudinary");

module.exports = {
  async register(data) {
    try {
      const name = data.name;
      const email = data.email;

      const password = await encryptPassword(data.password);
      return userRepository.create({ name, email, password });
    } catch (error) {
      throw error;
    }
  },

  async login(data) {
    try {
      const email = data.email;
      const password = data.password;

      const user = await userRepository.findByEmail(email.toLowerCase());
      if (!user) {
        throw {
          name: "wrongEmailPassword",
          message: "email or password are wrong",
        };
      }

      const isPasswordCorrect = await checkPassword(user.password, password);

      if (!isPasswordCorrect) {
        throw {
          name: "wrongEmailPassword",
          message: "email or password are wrong",
        };
      }

      const token = createToken({
        id: user.id,
        name: user.name,
        email: user.email,
      });

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        token,
      };
    } catch (error) {
      throw error;
    }
  },
  find(id) {
    return userRepository.find(id);
  },
  async update(id, user) {
    try {
      const userData = await userRepository.find(id);
      if (!userData) {
        throw {
          name: "userNotFound",
          message: "User is not found",
        };
      }

      if (userData.picture !== null) {
        if (user.picture) {
          const public_id = userData.picture.replace(/(.*)([\/](\w+))(\.(jpg|png|jpeg))/gm, "$3");

          await cloudinary.uploader.destroy(`users/${public_id}`);
        }
      } else {
        if (!user.picture) {
          throw {
            name: "badRequest",
            message: "please fill all required fields and make sure the data is valid",
          };
        }
      }

      if (!user.picture.buffer) {
        await userRepository.update(id, user);
      } else {
        const fileBase64 = user.picture.buffer.toString("base64");
        const file = `data:${user.picture.mimetype};base64,${fileBase64}`;
        cloudinary.uploader.upload(file, { folder: "users" }, async function (error, result) {
          if (error) {
            return error;
          } else {
            await userRepository.update(id, user, result.url);
          }
        });
      }
    } catch (error) {
      throw error;
    }
  },
  async changePassword(id, data) {
    try {
      const user = await userRepository.find(id);
      if (!user) {
        throw {
          name: "userNotFound",
          message: "User is not found",
        };
      }

      if (data.new_password === data.confirm_password) {
        // equals password and confirmPassword
        const passwordCompare = await checkPassword(user.password, data.old_password);
        if (!passwordCompare) {
          throw {
            name: "badRequest",
            message: "old password is wrong",
          };
        }

        const encryptedPassword = await encryptPassword(data.new_password);
        return userRepository.changePassword(id, encryptedPassword);
      } else {
        throw {
          name: "badRequest",
          message: "new password and confirm password are not equals",
        };
      }
    } catch (error) {
      throw error;
    }
  },
};
