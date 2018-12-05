const router = require('express').Router();
const { Question, Topic } = require('../db/models');
const asyncHandler = require('express-async-handler');

// GET ALL QUESTIONS
router.get(
  '/',
  asyncHandler(async (req, res, next) => {
    const allQuestions = await Question.findAll({});
    res.json(allQuestions);
  })
);

// GET QUESTIONS BY TOPIC
router.get(
  '/topic/:topicId',
  asyncHandler(async (req, res, next) => {
    const questions = await Question.findAll({
      where: {
        topicId: req.params.topicId
      },
      include: [{ model: Topic }]
    });
    res.json(questions);
  })
);

// GET QUESTIONS BY DIFFICULTY
router.get(
  '/difficulty/:difficultyLevel',
  asyncHandler(async (req, res, next) => {
    const questions = await Question.findAll({
      where: {
        difficulty: req.params.difficultyLevel
      },
      include: [{ model: Topic }]
    });
    res.json(questions);
  })
);

// GET QUESTION BY ID
router.get(
  '/:id',
  asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const question = await Question.findById(id);
    res.json(question);
  })
);

module.exports = router;
