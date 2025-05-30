require('dotenv').config();
const express = require('express');
const cors = require('cors');
const lyricsRoutes = require('./routes/lyrics.routes');
const userRoutes = require('./routes/users.routes')


const app = express();

const allowedOrigins = [
  "https://ailyricsgenerator.netlify.app",
  "http://localhost:3000",
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.options('*', cors());

app.use(express.json());

// Routes
app.use('/api/lyrics', lyricsRoutes);
app.use('/api/users', userRoutes)



app.use((err, req, res, next) => {
  console.error(' Global Error:', err.message);
  res.status(500).json({ error: 'Something went wrong on the server.' });
});

// Health check route 
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Nova AI Lyrics Generator is Running' });
});
const PORT = process.env.PORT || 3333;
app.listen(PORT, '0.0.0.0', () => {
  console.log("🔑 DATABASE_URL:", process.env.DATABASE_URL);
  console.log(`🚀 Server is running on port ${PORT}`);
});

