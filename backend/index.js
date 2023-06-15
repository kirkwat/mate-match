const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const corsOptions = require("./config/corsOptions");

const userRoutes = require("./routes/user");
const sessionRoutes = require("./routes/session");
const registerRoutes = require("./routes/register");
const requestRoutes = require("./routes/request");
const roommateRoutes = require("./routes/roommate");

const createModels = require("./middleware/createModels");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const verifyJWT = require("./middleware/verifyJWT");
const credentials = require("./middleware/credentials");

const app = express();
const PORT = 8000;
const server = app.listen(PORT, () => {
  console.log(`This app is listening on port ${PORT}`);
});

app.use(createModels);
app.use(logger);
app.use(express.json());
app.use(cookieParser());
app.use(credentials);
app.use(cors(corsOptions));

app.use("/session", sessionRoutes);
app.use("/register", registerRoutes);
app.use("/user", verifyJWT, userRoutes);
app.use("/request", verifyJWT, requestRoutes);
app.use("/roommate", verifyJWT, roommateRoutes);

app.get("/", (req, res) => {
  res.send("Healthy");
});

app.use(errorHandler);

module.exports = server;
