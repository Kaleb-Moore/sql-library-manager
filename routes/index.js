var express = require("express");
var router = express.Router();
const Book = require("../models").Book;

function asyncHandler(cb) {
	return async (req, res, next) => {
		try {
			await cb(req, res, next);
		} catch (error) {
			next(error);
		}
	};
}

/* GET home page. */
router.get("/", (req, res) => {
	return res.redirect("/books");
});

router.get(
	"/books",
	asyncHandler(async (req, res) => {
		const books = await Book.findAll();
		res.render("index", { books });
	})
);

router.get(
	"/books/new",
	asyncHandler(async (req, res) => {
		res.render("new-book");
	})
);

router.post(
	"/books/new",
	asyncHandler(async (req, res) => {
		let book;
		try {
			const book = await Book.create(req.body);
			res.redirect("/books");
		} catch (error) {
			if (error.name === "SequelizeValidationError") {
				book = await Book.build(req.body);
				res.render("new-book", {
					book,
					errors: error.errors,
					title: "New Book",
				});
			} else {
				throw error;
			}
		}
	})
);

router.get(
	"/books/:id",
	asyncHandler(async (req, res) => {
		const book = await Book.findByPk(req.params.id);
		if (book) {
			res.render("update-book", { book, title: "Edit Book" });
		} else {
			res.sendStatus(404);
		}
	})
);

router.post(
	"/books/:id",
	asyncHandler(async (req, res) => {
		let book;
		try {
			book = await Book.findByPk(req.params.id);
			if (book) {
				await Book.update(req.body);
				res.redirect("/books");
			} else {
				res.sendStatus(404);
			}
		} catch (error) {
			if (error.name === "SequelizeValidationError") {
				book = await Book.build(req.body);
				res.render("new-book", {
					book,
					errors: error.errors,
					title: "New Book",
				});
			} else {
				throw error;
			}
		}
	})
);

router.post(
	"/books/:id/delete",
	asyncHandler(async (req, res) => {
		const book = await Book.findByPk(req.params.id);
		if (book) {
			await book.destroy();
			res.redirect("/books");
		} else {
			res.sendStatus(404);
		}
	})
);

module.exports = router;
