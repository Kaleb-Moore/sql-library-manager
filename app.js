var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

const Book = require("./models").Book;

var indexRouter = require("./routes/index");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

const sequelize = require("./models").sequelize;

(async () => {
	await sequelize.sync();
	try {
		await sequelize.authenticate();
		console.log("Connection to the database successful!");
	} catch (error) {
		console.error("Error connecting to the database: ", error);
	}
})();

app.use((req, res, next) => {
	const err = new Error("Not found");
	err.status = 404;
	next(err);
});

app.use((err, req, res, next) => {
	if (err.status === 404) {
		res.status(404);
		res.render("page-not-found", { err });
	} else {
		err.message = err.message || "Something went wrong!";
		res.status(err.status || 500);
		res.render("error", { err });
	}
	console.log(err.status, err.message);
});

module.exports = app;
