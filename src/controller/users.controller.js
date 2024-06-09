const route = require('express').Router();

const { getAllUsers, createUser, updateUser } = require('../service/users.service.js');
const buildResponse = require('../helper/buildResponse.js');

route.get('/', async (req, res) => {
  try {
    buildResponse(res, 200, await getAllUsers());
  } catch (error) {
    buildResponse(res, 404, error.message);
  }
});

route.post('/', async (req, res) => {
  try {
    buildResponse(res, 201, await createUser(req.body.name));
  } catch (error) {
    buildResponse(res, 404, error.message);
  }
});

route.put('/:id', async (req, res) => {
  try {
    buildResponse(res, 200, await updateUser(req.params.id, req.body.name));
  } catch (error) {
    buildResponse(res, 404, error.message);
  }
});

module.exports = route;
