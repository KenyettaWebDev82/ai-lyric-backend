🚀 Getting Started
📥 1. Clone the Repository
git clone https://github.com/PursuitMadeMe/ai-lyric-backend.git
cd ai-lyric-backend


📦 2. Install Dependencies
npm install


⚡️ 3. Run the Backend Server
# With Node
node server.js

# OR with nodemon (if installed globally)
nodemon server.js


🌐 Live API URL
The backend is deployed on Render:
➡️ https://ai-lyric-backend.onrender.com


📡 API Endpoints
🎵 POST /api/lyrics
Generate lyrics using mood, genre, and singingMode.
Request Body:
{
  "mood": "joyful",
  "genre": "Hip Hop",
  "singingMode": true
}

Success Response:
{
  "lyrics": "Generated lyrics based on mood and genre."
}


💾 POST /api/lyrics/save
Save a generated lyric for the logged-in Firebase user.
{
  "firebase_uid": "user_firebase_uid",
  "title": "Nova Anthem",
  "content": "Here are the lyrics...",
  "mood": "empowered",
  "genre": "Pop"
}


📂 GET /api/lyrics/user/:firebase_uid
Fetch all saved lyrics for a user.


🔍 GET /api/lyrics/user/:firebase_uid/title/:title
Get one specific lyric by title and user.


🗑 DELETE /api/lyrics/:id
Delete a specific lyric by ID.


🛠 Project Structure
/ai-lyric-backend
├── controllers/
│   └── lyrics_controller.js     # Main lyric logic
│   └── users_controller.js      # User DB access
├── routes/
│   └── lyrics.routes.js
│   └── users.routes.js
├── services/
│   └── gemini.services.js       # Google AI integration
├── db.js                        # PostgreSQL pool config
├── server.js                    # Main Express server
├── .env                         # Env variables
├── package.json                 # Dependencies


📝 .env Configuration
Create a .env file:
PORT=3333
DATABASE_URL=your_postgres_connection_string
GEMINI_API_KEY=your_google_gemini_key


🧪 Test It with Postman
POST https://ai-lyric-backend.onrender.com/api/lyrics
Content-Type: application/json
{
  "mood": "sad",
  "genre": "R&B",
  "singingMode": false
}


🔐 Firebase Auth Integration
All saved lyrics are tied to a secure firebase_uid. Ensure frontend login happens via Firebase before saving or retrieving lyrics.


🚨 Error Handling
Missing or invalid fields return a 400 error.
Invalid firebase_uid returns 404.
Database or API errors return 500 server errors.


💡 Future Enhancements
🎤 Add more moods and genre-specific lyrical styles.
🔎 Add search + filter for saved lyrics.
✍️ Enable lyric editing.
🔐 Add advanced Firebase claims & role-based permissions.


👩‍💻 Author
Kenyetta Griffin


📄 License
Licensed under the MIT License.


🎉 Done!
You're now ready to run and deploy the backend for Nova's AI Lyric Generator!
✨ Let the lyrics flow ✨