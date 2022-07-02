const express = require("express");
const controllers = require("../app/controllers");
const { userValidation, productValidation, orderValidation } = require("../app/validations");
const checkValidate = require("../app/middlewares/checkValidate");
const middlewares = require("../app/middlewares/authorization");

const apiRouter = express.Router();

/**
 * TODO: Implement your own API
 *       implementations
 */
apiRouter.post("/api/v1/auth/register", userValidation.registerDataValidate, checkValidate, controllers.api.v1.userController.register);
apiRouter.post("/api/v1/auth/login", userValidation.loginDataValidate, checkValidate, controllers.api.v1.userController.login);
apiRouter.get("/api/v1/auth/user", middlewares.authorize, controllers.api.v1.userController.getCurrentUser);
apiRouter.put("/api/v1/auth/user/:id", middlewares.authorize, controllers.api.v1.userController.update);

// seller product
apiRouter.get("/api/v1/seller/product", middlewares.authorize, controllers.api.v1.productController.findProductByUser);
apiRouter.post("/api/v1/seller/product", middlewares.authorize, productValidation.productDataValidate, checkValidate, controllers.api.v1.productController.create);
apiRouter.get("/api/v1/seller/product/:id", middlewares.authorize, controllers.api.v1.productController.find);
apiRouter.put("/api/v1/seller/product/:id", middlewares.authorize, controllers.api.v1.productController.update);
apiRouter.delete("/api/v1/seller/product/:id", middlewares.authorize, controllers.api.v1.productController.delete);

// seller order
apiRouter.get("/api/v1/seller/order", middlewares.authorize, controllers.api.v1.orderController.findBidProduct);
apiRouter.get("/api/v1/seller/order/:id", middlewares.authorize, controllers.api.v1.orderController.findById);
apiRouter.put("/api/v1/seller/order/:id", middlewares.authorize, controllers.api.v1.orderController.updateStatus);

// seller category
apiRouter.get("/api/v1/seller/category/:id", middlewares.authorize, controllers.api.v1.categoryController.find);
apiRouter.get("/api/v1/seller/category", middlewares.authorize, controllers.api.v1.categoryController.getAllCategory);

// buyer product
apiRouter.get("/api/v1/buyer/product", middlewares.authorize, controllers.api.v1.productController.findAllAvailable);
apiRouter.get("/api/v1/buyer/product/:id", middlewares.authorize, controllers.api.v1.productController.find);

// buyer order
apiRouter.post("/api/v1/buyer/order", middlewares.authorize, orderValidation.orderDataValidate, checkValidate, controllers.api.v1.orderController.createOrder);
apiRouter.get("/api/v1/buyer/order", middlewares.authorize, controllers.api.v1.orderController.findOrderByUser);
apiRouter.get("/api/v1/buyer/order/:id", middlewares.authorize, controllers.api.v1.orderController.findById);
apiRouter.put("/api/v1/buyer/order/:id", middlewares.authorize, controllers.api.v1.orderController.updateOrder);

// history
apiRouter.get("/api/v1/history", middlewares.authorize, controllers.api.v1.orderController.historyUser);
apiRouter.get("/api/v1/history/:id", middlewares.authorize, controllers.api.v1.orderController.findById);

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
