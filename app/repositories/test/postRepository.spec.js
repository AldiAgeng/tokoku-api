const postRepository = require("../postRepository");
const { sequelize } = require("../../models");

const { queryInterface } = sequelize;

beforeAll(async () => {
  await queryInterface.bulkInsert(
    "Posts",
    [
      {
        title: "title",
        body: "body",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {}
  );
});

afterAll(async () => {
  await queryInterface.bulkDelete("Posts", null, {
    truncate: true,
    restartIdentity: true,
  });
});

describe("postRepository", () => {
  describe("create", () => {
    it("should create post", async () => {
      const post = await postRepository.create({
        title: "title",
        body: "body",
      });

      expect(post.title).toBe("title");
      expect(post.body).toBe("body");
    });
  });

  describe("findAll", () => {
    it("should find all posts", async () => {
      const posts = await postRepository.findAll();

      expect(posts.length >= 0).toBe(true);
    });
  });

  describe("find", () => {
    it("should find post by id", async () => {
      const post = await postRepository.find(1);

      expect(post.title).toBe("title");
      expect(post.body).toBe("body");
    });
  });

  describe("update", () => {
    it("should update post", async () => {
      const post = await postRepository.update(1, {
        title: "title2",
        body: "body2",
      });

      expect(post.length).toBe(1);
    });
  });

  describe("delete", () => {
    it("should delete post", async () => {
      const post = await postRepository.delete(1);

      expect(post).toBe(1);
    });
  });
});
