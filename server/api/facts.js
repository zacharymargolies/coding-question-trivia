const router = require('express').Router();
const { Fact } = require('../db/models');
const asyncHandler = require('express-async-handler');

// GET ALL FACTS
router.get(
  '/',
  asyncHandler(async (req, res, next) => {
    const allFacts = await Fact.findAll({});
    res.json(allFacts);
  })
);

// GET FACTS BY TOPIC
router.get(
  '/:topicId',
  asyncHandler(async (req, res, next) => {
    const facts = await Fact.findAll({
      where: {
        id: req.params.topicId
      }
    });
    res.json(facts);
  })
);

module.exports = router;
