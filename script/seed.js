"use strict";

const db = require("../server/db");
const { Fact, Topic } = require("../server/db/models");

const newFacts = [
  {
    topicId: 1,
    content: "content-1"
  },
  {
    topicId: 2,
    content: "content-2"
  },
  {
    topicId: 3,
    content: "content-3"
  },
  {
    topicId: 5,
    content: "content-4"
  },
  {
    topicId: 5,
    content: "content-5"
  }
];

const newTopics = [
  {
    main: "HTML",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/1200px-HTML5_logo_and_wordmark.svg.png"
  },
  {
    main: "CSS",
    image: "http://www.growingwiththeweb.com/images/general/css3.png"
  },
  {
    main: "Javascript",
    image: "https://c1.staticflickr.com/4/3701/19224697601_6b600f21eb.jpg"
  },
  {
    main: "NodeJS",
    image:
      "https://seeklogo.com/images/N/nodejs-logo-FBE122E377-seeklogo.com.png"
  },
  {
    main: "ExpressJS",
    image: "http://nashvillesoftwareschool.com/images/technologies/express.png"
  },
  {
    main: "ReactJS",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/640px-React-icon.svg.png"
  },
  {
    main: "ReduxJS",
    image: "https://avatars0.githubusercontent.com/u/13142323?s=400&v=4"
  }
];

const seed = () =>
  Promise.all(
    newTopics.map(topic => Topic.create(topic)),
    newFacts.map(fact => Fact.create(fact))
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
