process.env.UV_THREADPOOL_SIZE = 1;
const cluster = require("cluster");
if (cluster.isMaster) {
  cluster.fork();
  cluster.fork();
} else {
  const express = require("express");
  const dotenv = require("dotenv");
  const logger = require("morgan");
  const cors = require("cors");
  const mongoose = require("mongoose");

  const verifyToken = require("./util/verify-token");
  const appError = require("./util/error-service").appError;
  const errorHandler = require("./util/error-service").errorHandler;

  const regLoginRouter = require("./routes/reg-login-router");
  const userRouter = require("./routes/user-router");
  const tourRouter = require("./routes/tour-router");
  const locationsRouter = require("./routes/location-router");
  const tourPackagesRouter = require("./routes/tour-packages-router");

  const app = express();

  //reading configuration file and the data is stored in process.env
  dotenv.config({ path: "./config.env" });

  if (process.env.NODE_ENV === "development") {
    //logging in development mode
    app.use(logger("dev"));
  }

  // cross origin requests
  app.use(cors());

  // converting the request to json
  app.use(express.json());

  //routing for modules
  app.use("/regLogin", regLoginRouter);
  app.use("/users", verifyToken, userRouter);
  app.use("/tours", verifyToken, tourRouter);
  app.use("/locations", verifyToken, locationsRouter);
  app.use("/tour-packages", verifyToken, tourPackagesRouter);

  //unhandled routes
  app.all("*", (req, res, next) => {
    next(new appError(`Can't find the route: ${req.originalUrl}`), 404);
  });

  app.use(errorHandler);

  //database
  mongoose
    .connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })
    .then(() => console.log("DB connection successful"))
    .catch(() => console.log("DB connection failed"));

  //server
  app.listen(process.env.PORT, process.env.HOST, () => {
    console.log("server running");
  });
}
