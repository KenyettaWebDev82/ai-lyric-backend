const axios = require("axios");
require("dotenv").config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${GEMINI_API_KEY}`;

const generateDynamicPrompt = (mood, genre, singingMode) => {
  const scenarios = {
    "Hip Hop": [ "block party in Brooklyn", "late night cypher battle", "riding through ATL streets", "dreams of mixtape success" ],
    "Country": [ "bonfire night in Tennessee", "old truck breaking down", "front porch memories", "dancehall heartbreak story" ],
    "R&B": [ "slow dance in the rain", "late night confession", "old love letter found", "quiet moment by candlelight" ],
    "Pop": [ "summer music festival", "road trip anthem", "first crush at a concert", "dancing alone in my room" ],
    "Rock": [ "gritty garage band days", "loud arena nights", "leaving a small town behind", "midnight highway drive" ],
  };

  const scenario = scenarios[genre]?.[Math.floor(Math.random() * scenarios[genre].length)] || "";

  let prompt = ` 
##########################################
STRICT RULES FOR AI — DO NOT BREAK:
##########################################
🚫 BANNED WORDS:
sunrise, dawn, golden, city gold, fire, ashes, phoenix, chains, wings, morning, concrete jungle, sky, burning, glow, rising from the ashes, heart on fire, shine bright.

DELETE & REWRITE IF USED.

##########################################

ROLE:
Grammy-winning ${genre} songwriter
Mood: ${mood}
Scenario Inspiration: ${scenario}

##########################################
SONG STRUCTURE:
[Title]
[Verse 1] → MUST start with a real action, object, or slang.

[Chorus]
Catchy, memorable hook.

[Verse 2]
New detail only.

[Chorus]
[Bridge] (optional twist)
[Chorus] Final
[Outro] Closing line.
`;

  if (singingMode) {
    prompt += `
##########################################
SINGING MODE ENABLED:
##########################################
- Keep lines shorter
- Rhythm friendly
- Space for melody
- Repetition welcome
Example:
"Pull up slow / Bass real low"
`;
  }

  prompt += `
##########################################
READY? WRITE THE SONG NOW.
##########################################
`;

  return prompt;
};

const generateLyricsFromMood = async (mood, genre, singingMode = false) => {  // <-- Pass singingMode
  try {
    const prompt = generateDynamicPrompt(mood, genre, singingMode);

    const body = {
      contents: [
        {
          parts: [{ text: prompt }],
        },
      ],
    };

    const response = await axios.post(GEMINI_URL, body, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const lyrics = response.data.candidates[0].content.parts[0].text;
    return lyrics;

  } catch (error) {
    console.error("🛑 Gemini API error:", error.response?.data || error.message);
    throw error;
  }
};

module.exports = { generateLyricsFromMood };
