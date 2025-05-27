Nova AI Lyric Generator
Step back into the 80's — when music meant holding a cassette tape in your hands, carefully reading the handwritten lyrics on the insert, and feeling the artistry of every word before the song even played. Nova AI brings that vibe into the digital age by letting you generate your own unique song lyrics inspired by mood and genre, then save and explore them like your very own mixtape collection.

This app celebrates the magic of songwriting and nostalgia, blending cutting-edge AI with the warmth of those classic cassette days.



Overview
Frontend: React app for user interaction, lyric generation, and saved lyrics management

Backend: Node.js + Express API handling AI lyric generation, user registration, and data storage in PostgreSQL

Authentication: Firebase Authentication to secure user data

Deployment: Frontend hosted on Netlify, Backend hosted on Render

Communication: Frontend and backend communicate through REST API calls using environment variables



User Workflow
Register or log in with Firebase Authentication on the frontend.

Enter a song title, pick a genre and mood, and generate lyrics using AI.

Save lyrics to your personal collection.

View, expand, and delete your saved lyrics on the My Lyrics page.



Tech Stack
React 18, React Router v6, Firebase Auth

Node.js, Express, PostgreSQL

Hosted on Netlify (frontend) and Render (backend)



Deployment
Frontend
Hosted on Netlify: https://ailyricsgenerator.netlify.app

Make sure your frontend .env contains VITE_API_URL set to your backend URL (e.g., Render URL).

Backend
Hosted on Render: https://your-backend-url.onrender.com

Make sure your backend has environment variables set for DATABASE_URL (PostgreSQL) and any other secrets.



Running Locally (Optional)
If you want to run both frontend and backend on your local machine:

Backend
cd backend
npm install
npm run dev  # runs server on http://localhost:3333

Frontend
cd frontend
npm install
npm run dev  # runs React app on http://localhost:3000
Make sure to set your frontend .env file with:
VITE_API_URL=http://localhost:3333


Folder Structure

/frontend
  ├── src/
  │   ├── pages/         # React pages (Home, MyLyrics, Register, Login, etc.)
  │   ├── components/    # Reusable UI components
  │   └── App.jsx        # Main app container and router
/backend
  ├── controllers/       # Request handlers for API routesg
  ├── routes/            # Express route definitions
  ├── services/          # DB connection, AI services
  └── server.js          # Express server entry point


Contact
Built by Kenyetta Griffin — email: griffinkenyetta@gmail.com

