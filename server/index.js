const express = require("express");
const app = express();

//handling of backend from the frontend, to avoid cors error
const cors = require("cors");

//import the routes
const userRoutes = require("./routes/User");

//import the database connection
const database = require("./config/database");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const PORT = process.env.PORT || 4000;

//database connection
database.connect();

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "*", credentials: true }));

//mounting the routes
app.use("/api/v1/auth", userRoutes);

app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your app is running successfully",
  });
});

//activate the server
app.listen(PORT, () => {
  console.log(`App is running successfully on port ${PORT}`);
});
