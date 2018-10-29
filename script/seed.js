"use strict";

const db = require("../server/db");
const { Fact, Topic, Question } = require("../server/db/models");

const newFacts = [
  {
    topicId: 1,
    content: "HTML is short for Hypertext Markup Language."
  },
  {
    topicId: 1,
    content: "HTML can be considered the content of our website."
  },
  {
    topicId: 1,
    content: "HTML elements are the building blocks of HTML pages."
  },
  {
    topicId: 1,
    content: "HTML elements are represented by tags."
  },
  {
    topicId: 1,
    content:
      'HTML tags label pieces of content such as "heading", "paragraph", "table", and so on.'
  },
  {
    topicId: 1,
    content:
      "Browsers do not display HTML tags, but use them to render the content of the page."
  },
  {
    topicId: 2,
    content: "HTML can be considered the content of our website."
  },
  {
    topicId: 3,
    content: "CSS stands for Cascading Style Sheets."
  },
  {
    topicId: 3,
    content:
      "CSS provides the styling for our websites. It describes how the HTML elements in our websites should be displayed."
  },
  {
    topicId: 3,
    content:
      "CSS is a declarative language. This means that CSS explicitly describes its desired results. This means the language provides what is done, rather than how to do it."
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

const newQuestions = [
  {
    factId: 1,
    topicId: 1,
    content: "What does HTML stand for?",
    correctAnswer: "Hypertext Markup Language"
  },
  {
    factId: 2,
    topicId: 1,
    content: "What creates the structure for the content of our website?",
    correctAnswer: "HTML"
  },
  {
    factId: 7,
    topicId: 2,
    content: "What does CSS stand for?",
    correctAnswer: "Cascading Style Sheets"
  },
  {
    factId: 8,
    topicId: 2,
    content: "What provides the styling for a website?",
    correctAnswer: "CSS"
  }
];

const seed = () =>
  Promise.all(
    newTopics.map(topic => Topic.create(topic)),
    newFacts.map(fact => Fact.create(fact)),
    newQuestions.map(question => Question.create(question))
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
