require('dotenv').config();
const { PORT = 3000 } = process.env
const express = require("express");
const morgan = require("morgan");

const ViteExpress = require("vite-express");

const app = express();
const { authMiddleware } = require("./utils");

// Logging middleware
app.use(morgan("dev"));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(authMiddleware);

//Test Route
app.get("/test", (req, res) => {
  res.send("Test route is working!");
});

//Backend Routes
app.use("/auth", require("./auth"));
app.use("/api", require("./api"));

app.use((error, req, res, next) => {
  console.error('SERVER ERROR: ', error);
  if (res.statusCode < 400) {
      res.status(500);
  }
  res.send({
    error: error.message,
    name: error.name,
    message: error.message,
    table: error.table,
  });
})

ViteExpress.listen(app, PORT, () =>
  console.log(`Server is listening on port ${PORT}...`)
);