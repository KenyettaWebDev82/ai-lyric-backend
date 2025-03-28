require('dotenv').config();
const express = require('express');
const cors = require('cors');
const lyricsRoutes = require('./routes/lyrics.routes');

const app = express();

// Enable CORS for Netlify URL
const allowedOrigins = [
  "https://ailyricsgenerator.netlify.app", // ✅ Netlify URL
  "http://localhost:3000", // ✅ Local development
];

// Middleware
app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(express.json());

// Routes
app.use('/api/lyrics', lyricsRoutes);

app.use((err, req, res, next) => {
  console.error('❌ Global Error:', err.message);
  console.error('Error stack:', err.stack);
  res.status(500).json({ error: 'Something went wrong on the server.' });
});

// Start server
const PORT = 3333;
app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});
