const userRouter = require("./user.route");
const productRoutes = require("./product.route");

module.exports = (app) => {
  app.use("/user", userRouter);
  app.use("/user/product", productRoutes);
};
