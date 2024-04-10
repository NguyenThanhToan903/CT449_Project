const express = require("express");
const cors = require("cors");
const contactsRouter = require("./app/routes/client/contact.route");
const adminRoute = require("./app/routes/admin/index");
const ApiError = require("./app/api-error");
const app = express();
app.use(express.static("public"));

app.use(cors());
app.use(express.json());
// app.use(express.static("public"));

app.use("/admin");
app.use("/admin-main", contactsRouter);
app.get("/", (req, res) => {
  res.json({ message: "Welcome to contact book appliaction." });
});
app.use((req, res, next) => {
  return next(new ApiError(404, "Resource not found"));
});

app.use((err, req, res, next) => {
  return res.status(err.statusCode || 500).json({
    message: err.message || "Internal Server Error",
  });
});

module.exports = app;
