const express = require("express");
const cookieParser = require("cookie-parser");
const createError = require("http-errors");
const mongoose = require("mongoose");

const config = require("./config/config");
const todoRoute = require("./routes/todo");

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//connect to database
mongoose.connect(config.connection, {useNewUrlParser: true});
const connection = mongoose.connection;
connection.once("open", () => {
    console.log("Connected to MongoDB!")
});

//route
app.use("/api/todo", todoRoute);

//handle errors
app.use((req, res, next) => {
    next(createError(404));    
});

app.use((err, req, res) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    res.status(err.status);
    res.render("error");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("App is listening on port: ", port);
})