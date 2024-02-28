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
    // Get year1 and year2 from query parameters
    const { year1, year2 } = req.query

    // Construct SQL query with year range filter
    const sqlQuery = 'SELECT * FROM publications WHERE year >= $1 AND year <= $2';
    const values = [year1, year2];

    const { rows } = await client.query(sqlQuery, values);
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error querying database:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    client.release();
  }
}