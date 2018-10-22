const Sequelize = require("sequelize");
const db = require("../db");

const Question = db.define("question", {
  content: {
    type: Sequelize.STRING,
    allowNull: false
  },
  correctAnswer: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Question;
