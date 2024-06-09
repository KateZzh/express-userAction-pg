const { getAllEventsDB, createUserEventDB, getEventsByUserIdDB, getCountAllEventsDB } = require('../repository/events.repository');

async function getAllEvents() {
  const data = await getAllEventsDB();
  if (!data.length) throw new Error('table users_events is empty');

  return data;
}

async function getEventsByUserId(id, limit, page) {
  const { count } = await getCountAllEventsDB(id);

  if (limit >= count || limit === 'ALL' || limit === 'all' || !limit || limit < 1) {
    limit = count;
    page = 1;
  }

  const totalPage = Math.ceil(count / limit);
  if (page > totalPage || page < 1) page = 1;

  const offset = (page - 1) * limit;
  const data = await getEventsByUserIdDB(id, limit, offset);
  if (!data.length) throw new Error('userId not found');

  return { data, totalPage };
}

async function createUserEvent(userEvent, userId) {
  if (!userEvent || !userId) throw new Error('event and id require');
  const data = await createUserEventDB(userEvent, userId);

  if (!data.length) throw new Error('event has not been created');

  return data;
}

module.exports = { getAllEvents, createUserEvent, getEventsByUserId };
