const route = require('express').Router();

const { getAllEvents, getEventsByUserId } = require('../service/events.service');
const buildResponse = require('../helper/buildResponse');

route.get('/', async (req, res) => {
  try {
    buildResponse(res, 200, await getAllEvents());
  } catch (error) {
    buildResponse(res, 404, error.message);
  }
});

route.get('/:id', async (req, res) => {
  try {
    buildResponse(res, 200, await getEventsByUserId(req.params.id, req.query.limit, req.query.page));
  } catch (error) {
    buildResponse(res, 404, error.message);
  }
});

module.exports = route;
