"use strict";

const db = require("../server/db");
const { Fact } = require("../server/db/models");

const newFacts = [
  {
    topic: "HTML",
    content: "content-1"
  },
  {
    topic: "HTML",
    content: "content-2"
  },
  {
    topic: "HTML",
    content: "content-3"
  },
  {
    topic: "HTML",
    content: "content-4"
  },
  {
    topic: "HTML",
    content: "content-5"
  }
];

const seed = () => Promise.all(newFacts.map(fact => Fact.create(fact)));

const main = () => {
  console.log("Syncing db...");
  db.sync({ force: true })
    .then(() => {
      console.log("Seeding databse...");
      return seed();
    })
    .catch(err => {
      console.log("Error while seeding");
      console.log(err.stack);
    })
    .then(() => {
      db.close();
      return null;
    });
};

main();
