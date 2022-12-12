const express = require("express");
const cors = require("cors");

const userRoutes = require("./routes/user");
const sessionRoutes = require("./routes/session");
const registerRoutes = require("./routes/register");
const requestRoutes = require("./routes/request");
const algorithmRoutes = require("./routes/algorithm");
const roommateRoutes = require("./routes/roommate");

const { createModels } = require("./middleware/models");
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const { authenticateJWT } = require("./middleware/auth");

const app = express();
const PORT = 8000;

// add middleware
app.use(createModels);
app.use(logger);
app.use(express.json());
// Cross Origin Resource Sharing
//REMOVE LOCAL IPS
const whitelist = ['http://matematching.com', 'http://127.0.0.1:3000', 'http://localhost:3000'];
const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

app.get("/health", (request, response, next) => {
  const responseBody = { status: "up", PORT };
  response.json(responseBody);
  // next() is how we tell express to continue through the middleware chain
  next();
});

app.use("/session", sessionRoutes);
app.use("/user", authenticateJWT, userRoutes);
app.use("/request", authenticateJWT, requestRoutes);
app.use("/register", registerRoutes);
app.use("/algorithm", algorithmRoutes);
app.use("/roommate", authenticateJWT,roommateRoutes);

app.use(errorHandler);

app.listen(PORT, () => console.log(`This app is listening on port  ${PORT}`));