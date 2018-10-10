"use strict";

const db = require("../server/db");
const { Fact, Topic } = require("../server/db/models");

const newFacts = [
  {
    // topicId: 1,
    content: "content-1"
  },
  {
    // topicId: 1,
    content: "content-2"
  },
  {
    // topicId: 1,
    content: "content-3"
  },
  {
    // topicId: 1,
    content: "content-4"
  },
  {
    // topicId: 1,
    content: "content-5"
  }
];

const newTopics = [
  {
    main: "HTML"
  },
  {
    main: "CSS"
  },
  {
    main: "Javascript"
  },
  {
    main: "NodeJS"
  },
  {
    main: "ExpressJS"
  },
  {
    main: "React"
  },
  {
    main: "Redux"
  }
];

const seed = () =>
  Promise.all(
    newFacts.map(fact => Fact.create(fact)),
    newTopics.map(topic => Topic.create(topic))
  );

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
