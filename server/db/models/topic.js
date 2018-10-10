const Sequelize = require("sequelize");
const db = require("../db");

const Topic = db.define("topics", {
  main: {
    type: Sequelize.STRING,
    allowNull: false
  },
  sub: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  }
});

module.exports = Topic;
