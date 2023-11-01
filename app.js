const express = require("express");
const app = express();
const rateLimit = require('express-rate-limit');
const bodyParser = require("body-parser");
const Router = require("./routes/route");
require("dotenv").config();
require("./db/conn");
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // max 5 request every 15 minutes
});
app.use(limiter);
app.use(express.json());

app.use("/", Router);

app.listen(process.env.PORT, () => {
  console.log(`Server is running at ${process.env.PORT}`);
});
