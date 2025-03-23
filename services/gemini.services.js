const axios = require("axios");
require("dotenv").config(); // Make sure your .env is being loaded

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;


//HUGE DEV BUG!!
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${GEMINI_API_KEY}`;

const generateLyricsFromMood = async (mood) => {
  try {
    const prompt = `Write a creative, structured song with verses and a chorus in a ${mood} mood.`;

    const body = {
      contents: [
        {
          parts: [{ text: prompt }]
        }
      ]
    };

    const response = await axios.post(GEMINI_URL, body, {
      headers: {
        "Content-Type": "application/json"
      }
    });

    const lyrics = response.data.candidates[0].content.parts[0].text;
    return lyrics;

  } catch (error) {
    console.error("🛑 Gemini API error:", error.response?.data || error.message);
    throw error;
  }
};

module.exports = { generateLyricsFromMood };
