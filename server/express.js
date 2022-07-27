const express = require("express");
const session = require("express-session");
const hbs = require("express-handlebars");
const BotClient = require('./bot');
const path = require("path");
const app = express();

const publicPath = path.resolve(__dirname, '../public');

app 
    .set("port", process.env.PORT || 3000)
    .use("/", express.static(publicPath))
    .set("views", path.join(__dirname, "../views"))
    .set("view engine", ".hbs")
    .engine(".hbs", hbs.engine({
        extname: "hbs",
    }))
    .use((req, res, next) => {
        req.BotClient = BotClient;
        next();
    })
    .use("/", require("../routes/routes"));

module.exports = app;