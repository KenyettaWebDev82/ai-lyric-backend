# Nova AI Lyric Generator

Step back into the 80's — when music meant holding a cassette tape in your hands, carefully reading the handwritten lyrics on the insert, and feeling the artistry of every word before the song even played. Nova AI brings that vibe into the digital age by letting you generate your own unique song lyrics inspired by mood and genre, then save and explore them like your very own mixtape collection.

This app celebrates the magic of songwriting and nostalgia, blending cutting-edge AI with the warmth of those classic cassette days.

---

## User Story

As a music lover with a flair for the retro, I want to create AI-generated lyrics based on mood and genre so I can relive the magic of mixtape culture, explore personal emotions through music, and curate a digital collection of songs that feel like they were made just for me.

---

## Overview

**Frontend:** React app for user interaction, lyric generation, and saved lyrics management
**Backend:** Node.js + Express API handling AI lyric generation, user registration, and data storage in PostgreSQL
**Authentication:** Firebase Authentication to secure user data
**Deployment:** Frontend hosted on Netlify, Backend hosted on Render
**Communication:** Frontend and backend communicate through REST API calls using environment variables

---

## Code Highlights

### Backend: Gemini AI Prompt Logic
**Backend:** I wrote a custom `generateDynamicPrompt()` function that feeds Gemini a highly specific prompt based on the user’s selected mood and genre. This helped eliminate bland, repetitive AI outputs and created lyrics that actually feel authentic, emotional, and genre-aware. It taught me how powerful good prompt engineering can be in shaping AI responses.

```js
// services/gemini.services.js
function generateDynamicPrompt(mood, genre) {
  return `You're a Grammy-winning songwriter. Write original ${genre} lyrics that capture the feeling of '${mood}'.
Make them feel like a real artist’s song.

Include:
- A vivid, realistic title
- A strong opening with action or imagery
- Verse 1, Chorus, Verse 2, Chorus, Bridge (optional), Chorus (final)
- Avoid cliches like 'sunrise' or 'rising from the ashes'
- Use culture-specific references if they match the genre
- Stay true to the mood`
}

async function generateLyricsFromMood(mood, genre, singingMode) {
  const prompt = generateDynamicPrompt(mood, genre);
  const result = await geminiClient.generateText({ prompt });
  return result.text;
}
```
### Frontend: Falling Notes Animation
**Frontend:** I designed animated falling music notes from scratch using pure CSS and mapped them across the screen using JavaScript. This gives the app personality and nostalgia — like old-school music visualizers. It also taught me how to create engaging UI without needing external libraries.

```jsx
// App.jsx
<div className="falling-notes">
  {["🎵", "🎶", "🎷", "🎼", "🎤"].map((icon, i) => (
    <span key={i} className="music-note">{icon}</span>
  ))}
</div>
```

```css
/* App.css */
.falling-notes {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  overflow: hidden;
  z-index: 0;
}
.music-note {
  position: absolute;
  top: -10%;
  font-size: 50px;
  opacity: 0.6;
  animation: fall linear infinite;
}
@keyframes fall {
  0% { transform: translateY(-10%); opacity: 1; }
  100% { transform: translateY(100vh); opacity: 0; }
}
```

---

## User Workflow

1. Register or log in with Firebase Authentication on the frontend.
2. Enter a song title, pick a genre and mood, and generate lyrics using AI.
3. Save lyrics to your personal collection.
4. View, expand, and delete your saved lyrics on the My Lyrics page.

---

## Tech Stack

* React 18, React Router v6, Firebase Auth
* Node.js, Express, PostgreSQL
* Hosted on Netlify (frontend) and Render (backend)

---

## Deployment

### Frontend

Hosted on Netlify: [https://ailyricsgenerator.netlify.app]
Make sure your frontend `.env` contains:

VITE_API_URL=https://your-backend-url.onrender.com

### Backend

Hosted on Render: [https://your-backend-url.onrender.com]
Backend `.env` should include:

DATABASE_URL=your_postgresql_connection_string

---

## Running Locally (Optional)

### Backend

cd backend
npm install
npm run dev  # runs server on http://localhost:3333

### Frontend

cd frontend
npm install
npm run dev  # runs React app on http://localhost:3000

Set your frontend `.env` file:

VITE_API_URL=http://localhost:3333

---

## Folder Structure

/frontend
  ├── src/
  │   ├── pages/         # React pages (Home, MyLyrics, Register, Login, etc.)
  │   ├── components/    # Reusable UI components
  │   └── App.jsx        # Main app container and router
/backend
  ├── controllers/       # Request handlers for API routes
  ├── routes/            # Express route definitions
  ├── services/          # DB connection, AI services
  └── server.js          # Express server entry point

---

## Contact
Built by Kenyetta Griffin
📧 Email: griffinkenyetta@gmail.com
🔗 LinkedIn: https://www.linkedin.com/in/kenyetta-griffin-968471166/

