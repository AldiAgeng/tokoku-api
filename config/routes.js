const express = require("express");
const controllers = require("../app/controllers");
const { userValidation } = require("../app/validations");
const middlewares = require("../app/middlewares/authorization");

const apiRouter = express.Router();

/**
 * TODO: Implement your own API
 *       implementations
 */
apiRouter.post("/api/v1/auth/register", userValidation.registerDataValidate, controllers.api.v1.userController.register);
apiRouter.post("/api/v1/auth/login", userValidation.loginDataValidate, controllers.api.v1.userController.login);

// seller product
apiRouter.get("/api/v1/seller/product", middlewares.authorize, controllers.api.v1.productController.findProductByUser);
apiRouter.post("/api/v1/seller/product", middlewares.authorize, controllers.api.v1.productController.create);
apiRouter.get("/api/v1/seller/product/:id", middlewares.authorize, controllers.api.v1.productController.find);
apiRouter.put("/api/v1/seller/product/:id", middlewares.authorize, controllers.api.v1.productController.update);
apiRouter.delete("/api/v1/seller/product/:id", middlewares.authorize, controllers.api.v1.productController.delete);

/**
 * TODO: Delete this, this is just a demonstration of
 *       error handler
 */
apiRouter.get("/api/v1/errors", () => {
  throw new Error("The Industrial Revolution and its consequences have been a disaster for the human race.");
});

apiRouter.use(controllers.api.main.onLost);
apiRouter.use(controllers.api.main.onError);

module.exports = apiRouter;
