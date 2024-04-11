const adminRoute = require("./admin.route");
const productsRoute = require("./products.route");

module.exports = (app) => {
  app.use("/admin", adminRoute);
  app.use("/admin-products", productsRoute);
};
