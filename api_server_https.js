const express = require('express');
const mariadb = require('mariadb');
require('dotenv').config()
const app = express();
const port = process.env.PORT ||3000;
const cors = require('cors');
const names = require('./names.json')
const channels = require('./channels.json')
const fs = require('fs');
const https = require('https');
const http = require('http');

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
});

// Use Cors
app.use(cors({
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// Configure MariaDB connection
const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// SQL query function
async function doDatabaseQuery(query) {
  const connection = await pool.getConnection();
  const data = await connection.query(query);
  connection.release();
  return data;
}

// Paths to your SSL certificate
const privateKey = fs.readFileSync('./private.key', 'utf8');
const certificate = fs.readFileSync('./cert.pem', 'utf8');

const credentials = { key: privateKey, cert: certificate };

const https_port = 443; // Default HTTPS port

https.createServer(credentials, app).listen(https_port, process.env.HOST_IP, () => {
  console.log(`Server running on https://localhost:${port}`);
});

// API Endpoints
// top 3 messagers
app.get('/api/top_three_messagers', async (req, res) => {
  try {
    const data = await doDatabaseQuery('SELECT author_id, COUNT(*) AS message_count FROM messages GROUP BY author_id ORDER BY message_count DESC LIMIT 3;');

    const topThree = [];
    for (let i = 0; i < 3 && i < data.length; i++) {
      const userId = data[i].author_id.toString();
      const messageCount = data[i].message_count.toString();

      topThree.push({
        user: names[userId] || `idk who this is: (${userId})`,
        messages: messageCount,
      });
    }

    res.json(topThree);

  } catch (error) {
    console.error('Database query error:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

// most used channel
app.get('/api/most_used_channel', async (req, res) => {
  try {
    const data = await doDatabaseQuery('SELECT channel_id, COUNT(*) AS message_count FROM messages GROUP BY channel_id ORDER BY message_count DESC LIMIT 3;');

    const topThree = [];
    for (let i = 0; i < 3 && i < data.length; i++) {
      const channelId = data[i].channel_id.toString();
      const messageCount = data[i].message_count.toString();

      topThree.push({
        channel: channels[channelId] || `idk which channel this is: (${channelId})`,
        messages: messageCount,
      });
    }

    res.json(topThree);

  } catch (error) {
    console.error('Database query error:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

// total messages sent
app.get('/api/message_count', async (req, res) => {
  try {
    const data = await doDatabaseQuery('SELECT COUNT(*) as message_count FROM messages;');

    const count = data[0].message_count.toString();

    res.json({
      messageCount: count
    });

  } catch (error) {
    console.error('Database query error:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});
