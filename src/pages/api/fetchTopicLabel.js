import { Pool } from 'pg';

const pool = new Pool({
    user: process.env.DATABASE_USER,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    port: parseInt(process.env.DATABASE_PORT, 10), // Ensure the port is a number
  });

export default async function handler(req, res) {
  const client = await pool.connect();
  try {

    // Construct SQL query with year range filter
    const sqlQuery = 'SELECT DISTINCT topic_list FROM vectorized_publications WHERE topic_code <> -1';

    const { rows } = await client.query(sqlQuery);
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error querying database:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    client.release();
  }
}