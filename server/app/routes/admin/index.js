const adminRoute = require("./admin.route");

module.exports = (e) => {
  e.use("/admins", adminRoute);
};
