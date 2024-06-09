const pool = require('../db');

async function getAllEventsDB() {
  const client = await pool.connect();
  const sql = 'SELECT * FROM users_events';

  const { rows } = await client.query(sql);

  client.release();

  return rows;
}

async function getCountAllEventsDB(id) {
  const client = await pool.connect();
  const sql = 'SELECT COUNT(*) FROM users_events WHERE user_id = $1';

  const { rows } = await client.query(sql, [id]);

  client.release();

  return rows[0];
}

async function getEventsByUserIdDB(id, limit, offset) {
  const client = await pool.connect();

  const sql = 'SELECT * FROM users_events WHERE user_id = $1 LIMIT $2 OFFSET $3';

  const { rows } = await client.query(sql, [id, limit, offset]);

  client.release();

  return rows;
}

async function createUserEventDB(userEvent, userId) {
  const client = await pool.connect();
  const sql = 'INSERT INTO users_events (user_event, user_id) VALUES ($1, $2) RETURNING *';

  const { rows } = await client.query(sql, [userEvent, userId]);

  client.release();

  return rows;
}

module.exports = { getAllEventsDB, createUserEventDB, getEventsByUserIdDB, getCountAllEventsDB };
