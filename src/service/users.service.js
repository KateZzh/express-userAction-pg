const { getAllUsersDB, createUserDB, updateUserDB } = require('../repository/users.repository');
const { createUserEvent } = require('./events.service');

async function getAllUsers() {
  const data = await getAllUsersDB();
  if (!data.length) throw new Error('table users is empty');

  return data;
}

async function createUser(name) {
  if (!name) throw new Error('name require');

  const data = await createUserDB(name);
  if (!data.length) throw new Error('user has not been created');

  const event = await createUserEvent('user created', data[0].id);

  return { data, event };
}

async function updateUser(id, name) {
  if (!name || !id) throw new Error('id and name require');

  const data = await updateUserDB(id, name);
  if (!data.length) throw new Error('id not found');

  await createUserEvent('user updated', id);

  return data;
}

module.exports = { getAllUsers, createUser, updateUser };
