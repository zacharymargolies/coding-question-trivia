const Sequelize = require("sequelize");
const db = require("../db");

const Fact = db.define("fact", {
  content: {
    type: Sequelize.STRING,
    allowNull: false
  },
  imageURL: {
    type: Sequelize.STRING,
    defaultValue:
      "https://s3.eu-west-2.amazonaws.com/fifteen-uploads/uploads/2016/10/DeveloperChallenges.jpg"
  },
  difficulty: {
    type: Sequelize.INTEGER,
    validate: {
      min: 1,
      max: 5
    }
  }
});

module.exports = Fact;
