function fourOneFourHandler(req, res, next) {
	const err = new Error("It looks like this page doesn't exist.");
	err.status = 404;
	next(err);
}

function globalHandler(err, req, res, next) {
	if (err.status === 404) {
		res.status(404);
		res.render("page-not-found", { err });
		console.log("Calling 404 Error Handler");
	} else {
		err.message =
			err.message || "Oops! Looks like there was a problem with the server.";
		res.status(err.status || 500);
		res.render("error", { err });
	}
	console.log(err.status, err.message);
}

module.exports = { fourOneFourHandler, globalHandler };
