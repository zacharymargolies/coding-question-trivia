const Sequelize = require("sequelize");
const db = require("../db");

const Fact = db.define("fact", {
  content: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Fact;
