const wakeUpFunction = require('../controllers/wakeup');

const route = require('express').Router();

route.get("/wakeUp",wakeUpFunction)

module.exports = route;