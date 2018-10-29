// TODO: Require models here, define associations, export models
const Fact = require("./fact");
const Topic = require("./topic");
const Question = require("./question");

Topic.hasMany(Fact);
Fact.belongsTo(Topic);

Fact.hasMany(Question);
Question.belongsTo(Fact);

Topic.hasMany(Question);
Question.belongsTo(Topic);

module.exports = {
  Fact,
  Topic,
  Question
};
