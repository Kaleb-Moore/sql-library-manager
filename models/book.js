"use strict";
const { Model, Sequelize } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Book extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	Book.init(
		{
			title: {
				type: Sequelize.STRING,
				allowNull: false,
				validate: {
					notEmpty: {
						msg: "'Title' cannot be blank",
					},
				},
			},
			author: {
				type: Sequelize.STRING,
				allowNull: false,
				validate: {
					notEmpty: {
						msg: "'Author' cannot be blank",
					},
				},
			},
			genre: Sequelize.STRING,
			year: Sequelize.INTEGER,
		},
		{
			sequelize,
			modelName: "Book",
		},
		{ sequelize }
	);
	return Book;
};
