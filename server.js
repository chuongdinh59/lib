const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { default: mongoose } = require("mongoose");
const authRouter = require("./src/routers/auth");
const dotevn = require("dotenv");
// ================== SET UP ==================
dotevn.config();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
mongoose.connect("mongodb://localhost:27017");

app.use("/api/auth", authRouter);
app.listen(3000);
