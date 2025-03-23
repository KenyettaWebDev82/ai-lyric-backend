require('dotenv').config();
console.log("🔑 Loaded API KEY:", process.env.GEMINI_API_KEY);
const express = require('express');
const cors = require('cors');
const lyricsRoutes = require('./routes/lyrics.routes');

const app = express();

// Middleware
app.use(cors());
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
