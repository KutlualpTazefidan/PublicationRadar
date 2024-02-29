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

    const sqlQuery = 'SELECT filename, document_key, alignment_rating, analysis_content FROM analysis_results';

    const { rows } = await client.query(sqlQuery);
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error querying database:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    client.release();
  }
}