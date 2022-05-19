const express = require("express");
const app = express();
const Car = require("./models/carModel");
const port = process.env.PORT || 5000;
const dbConnection = require("./db");
app.use(express.json());
const path = require("path");
const usersRoute = require("./routes/usersRoute");
const bikesRoute = require("./routes/bikesRoute");
const bookingsRoute = require("./routes/bookingsRoute");

app.use("/api/bikes/", require("./routes/bikesRoute"));
app.use("/api/users/", require("./routes/usersRoute"));
app.use("/api/bookings/", require("./routes/bookingsRoute"));
app.use(express.static(__dirname));

//----------deployment-----------------

__dirname = path.resolve();

if ("production" === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

//----------deployment-----------

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(port, () => console.log(`Node JS Server Started in Port ${port}`));
