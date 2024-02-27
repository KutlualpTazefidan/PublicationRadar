import { Pool } from 'pg'; // Assuming you're using pg for PostgreSQL

// Create a new pool instance with your database connection details
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
    // Query to get list of tables in the 'public' schema
    // const { rows } = await client.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'");
    const { rows } = await client.query("SELECT table_schema, table_name FROM information_schema.tables WHERE table_type = 'BASE TABLE' AND table_schema NOT IN ('pg_catalog', 'information_schema')");
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error connecting to the database:', error);
    res.status(500).json({ error: 'Failed to connect to the database or retrieve data' });
  } finally {
    client.release();
  }
}