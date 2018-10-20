const router = require("express").Router();
const { Fact, Topic } = require("../db/models");
const asyncHandler = require("express-async-handler");

// GET ALL FACTS
router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    const allFacts = await Fact.findAll({});
    res.json(allFacts);
  })
);

// GET FACTS BY TOPIC
router.get(
  "/:topicId",
  asyncHandler(async (req, res, next) => {
    const facts = await Fact.findAll({
      where: {
        topicId: req.params.topicId
      },
      include: [{ model: Topic }]
    });
    res.json(facts);
  })
);

module.exports = router;
