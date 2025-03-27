🚀 Getting Started

📥 1. Clone the Repository
git clone https://github.com/PursuitMadeMe/ai-lyric-backend.git
cd ai-lyric-backend

📦 2. Install Dependencies
Run the following command to install required packages:
npm install

⚡️ 3. Run the Backend Server
Start the backend on port 3333:
node server.js
Or if you're using nodemon:
nodemon server.js

🔥 API Endpoint
🎵 POST /api/lyrics
Generates lyrics based on the mood provided by the frontend.
URL: http://localhost:3333/api/lyrics
Method: POST
Request Body:
{
  "mood": "dreamy" | "romantic" | "melancholy" | "joyful" | "empowered"
}
Success Response:
{
  "lyrics": "Generated lyrics based on the selected mood."
}
Error Response:
{
  "error": "Failed to generate lyrics. Please try again later."
}

📂 Project Structure
/ai-lyric-backend
├── /node_modules
├── /public
│   └── vibe2.webp
├── /routes
│   └── lyrics.js        # Handles mood-based lyric generation
├── server.js            # Main entry point for the backend
└── package.json

📝 .env Configuration
To configure environment variables, create a .env file in the root folder and add the following:
PORT=3333

🛠️ API Integration (Optional)
If you plan to integrate a 3rd-party AI API, update the /routes/lyrics.js file with your desired API key and endpoint.

🚨 Error Handling
Invalid or missing mood will return an error message.
Network errors or API issues will trigger a fallback message.

💡 Future Enhancements
🎤 Add more moods and lyric styles.
🎵 Improve API error handling.
🔒 Add input validation.

📣 Contributors
👩‍💻 Kenyetta Griffin - GitHub

📄 License
This project is licensed under the MIT License.

🎉 Done!
You’re now ready to run the backend for Nova’s AI Lyric Generator! 🎧✨