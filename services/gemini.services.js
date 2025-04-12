const axios = require("axios");
require("dotenv").config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${GEMINI_API_KEY}`;

// Explicitly enhanced random prompt generator
const generateDynamicPrompt = (mood, genre) => {
  const scenarios = {
    "Hip Hop": [
      "block party in Brooklyn",
      "late night cypher battle",
      "riding through ATL streets",
      "dreams of mixtape success",
    ],
    "Country": [
      "bonfire night in Tennessee",
      "old truck breaking down",
      "front porch memories",
      "dancehall heartbreak story",
    ],
    "R&B": [
      "slow dance in the rain",
      "late night confession",
      "old love letter found",
      "quiet moment by candlelight",
    ],
    "Pop": [
      "summer music festival",
      "road trip anthem",
      "first crush at a concert",
      "dancing alone in my room",
    ],
    "Rock": [
      "gritty garage band days",
      "loud arena nights",
      "leaving a small town behind",
      "midnight highway drive",
    ],
  };

  const scenario = scenarios[genre]?.[
    Math.floor(Math.random() * scenarios[genre].length)
  ] || "";

  return `
  INTERNAL RULES FOR AI:
  - No generic openings.
  - No words from banned list.
  - MUST start with a person doing something specific.
  - FORCE diversity in each generation.
  
  BANNED WORDS: sunrise, dawn, golden, city gold, fire, ashes, phoenix, chains, wings, sky, burning, glow, rising from the ashes, heart on fire, shine bright.
  
  ROLE:
  - Grammy-winning ${genre} songwriter.
  - Mood: ${mood}
  - Scenario: ${scenario}
  
  SONG STRUCTURE:
  [Title: Creative, Slang-friendly, Genre-specific]
  
  [Verse 1]
  OPEN with a *completely unexpected* visual.
  Example: 
  - "Lil Tay braiding hair on the corner"
  - "Cups stacked high at Mama Jean's fish fry"
  - "Uncle Lenny slamming dominoes at the park"
  
  Make Verse 1 feel hyper-local, true to ${genre}, and visual.
  
  [Chorus]
  Catchy, repeatable, feels authentic.
  
  [Verse 2]
  New detail or story twist.
  
  [Chorus]
  
  [Bridge]
  Optional emotional moment or flip.
  
  [Chorus] Final repeat.
  
  [Outro]
  Strong closing line that leaves impact.
  
  REQUIREMENTS:
  - Real people doing real things.
  - Slang and culture welcome.
  - No poetic fluff.
  - No repeated openings.
  - Avoid all banned words.
  
FINAL REMINDER TO AI:
→ If the first line of Verse 1 uses: sunrise, dawn, light, city, gold, fire, sky, ashes, or waking up → DELETE & REWRITE that line.

→ Verse 1 should start with:
- A person doing something real
- A setting with objects/slang
- Genre-specific culture

---

Now, write the song.

Make it sound like a Grammy-winning songwriter wrote this for a ${genre} artist in a ${mood} mood.

No generic lines. No fluff. No poetry filler.
`;  
  
};

const generateLyricsFromMood = async (mood, genre) => {
  try {
    const prompt = generateDynamicPrompt(mood, genre);

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
