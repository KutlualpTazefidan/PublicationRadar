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
    // Get topic query parameter
    const {topic} = req.query

    // Construct SQL query with year range filter
    const sqlQuery1 = 'SELECT publication_date, citation_count FROM topic_data WHERE topic = $1';
    const sqlQuery2 = 'SELECT publication_date, citation_count FROM topic_test_data WHERE topic = $1';
    const sqlQuery3 = 'SELECT publication_date, citation_count FROM topic_predictions WHERE topic = $1';
    const values = [topic];
    
    const results = await Promise.all([
      client.query(sqlQuery1, values),
      client.query(sqlQuery2, values),
      client.query(sqlQuery3, values),
    ]);

    const rows1 = results[0].rows;
    const rows2 = results[1].rows;
    const rows3 = results[2].rows;
    
    res.status(200).json({topicData: rows1, topicTestData: rows2, topicPredictions: rows3});

  } catch (error) {
    console.error('Error querying database:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    client.release();
  }
}