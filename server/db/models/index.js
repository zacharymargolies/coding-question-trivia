// TODO: Require models here, define associations, export models
const Fact = require("./fact");
const Topic = require("./topic");

Fact.belongsTo(Topic);

module.exports = {
  Fact,
  Topic
};
