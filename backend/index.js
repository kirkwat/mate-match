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

const app = express();
const PORT = 8000;

app.use(createModels);
app.use(logger);
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

app.get("/health", (request, response, next) => {
  const responseBody = { status: "up", PORT };
  response.json(responseBody);
  next();
});

app.use("/session", sessionRoutes);
app.use("/register", registerRoutes);
app.use("/user", verifyJWT, userRoutes);
app.use("/request", verifyJWT, requestRoutes);
app.use("/roommate", verifyJWT, roommateRoutes);

app.use(errorHandler);

app.listen(PORT, () => console.log(`This app is listening on port  ${PORT}`));
