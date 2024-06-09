const pool = require('../db');

async function getAllUsersDB() {
  const client = await pool.connect();
  const sql = 'SELECT * FROM users';

  const { rows } = await client.query(sql);

  client.release();

  return rows;
}

async function createUserDB(name) {
  const client = await pool.connect();
  const sql = 'INSERT INTO users (name) VALUES ($1) RETURNING *';

  const { rows } = await client.query(sql, [name]);

  client.release();

  return rows;
}

async function updateUserDB(id, name) {
  const client = await pool.connect();
  const sql = 'UPDATE users SET name = $1 WHERE id = $2 RETURNING *';

  const { rows } = await client.query(sql, [name, id]);

  client.release();

  return rows;
}

module.exports = { getAllUsersDB, createUserDB, updateUserDB };
