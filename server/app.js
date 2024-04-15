const cors = require("cors");
const express = require("express");
const cookieParser = require("cookie-parser");
const ApiError = require("./app/api-error");
const database = require("./app/config/database");
const indexAdminRoute = require("./app/routes/admin/index");
const indexUserRoute = require("./app/routes/client/index");
const PORT = process.env.PORT || 3000;
require("dotenv").config();
const app = express();
database.connect();

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3001"],
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));

indexAdminRoute(app);
indexUserRoute(app);
// app.use("/admin-main", adminAuht);
// app.use("/page-client", userAuth);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to contact book appliaction." });
});
// app.use((req, res, next) => {
//   return next(new ApiError(404, "Resource not found"));
// });

// app.use((err, req, res, next) => {
//   return res.status(err.statusCode || 500).json({
//     message: err.message || "Internal Server Error",
//   });
// });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
