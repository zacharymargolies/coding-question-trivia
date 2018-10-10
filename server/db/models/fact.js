const Sequelize = require('sequelize')
const db = require('../db')

const Fact = db.define('fact', {
    topic: {
        type: Sequelize.STRING,
        allowNull: false
    },
    content: {
        type: Sequelize.STRING,
        allowNull: false
    },
    subtopic: {
        type: Sequelize.ARRAY(Sequelize.STRING)
    }
})

module.exports = Fact