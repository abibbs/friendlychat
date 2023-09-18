![friendlychat logo](https://i.ibb.co/D9qVdfb/Friendly-Chat-logo-large.png)

FriendlyChat is a real-time chat application with AI-powered features like sentiment analysis and speech recognition.

## Key Features
- Real-time messaging with Socket.io
- Message caching with Redis to reduce API calls and improve latency
- Sentiment analysis on messages using GPT 3.5 for safe and friendly conversations
- Speech-to-text with Deepgram AI API

## Tech Stack
- React frontend
- Node.js + Express backend
- Redis for caching
- Socket.io for real-time communication
- GPT 3.5 for sentiment analysis
- Deepgram for speech-to-text

![friendlychat tech stack](https://i.ibb.co/TcG1ygc/Friendlychat-Tech-Stack.png)

**Real-time Messaging**  
Implemented real-time messaging using Socket.io. Users can send and receive messages instantly without page refreshes.

**Message Caching**  
Implemented a message cache layer using Redis to reduce load on OpenAI API. Frequently accessed messages are stored in Redis for low latency retrieval.

**Sentiment Analysis**  
Integrated GPT 3.5 to analyze the sentiment of chat messages. This provides a layer of filtering to flag messages with toxic or harmful language. Helps ensure conversations remain friendly.

**Speech-to-Text**  
Used Deepgram's speech recognition API to add speech-to-text capabilities. Users can dictate messages which are transcribed and sent in real-time.

## Getting Started
### Prerequisites
-   Node.js v16+
-   Redis instance
-   Deepgram API key
-   GPT 3.5 API key

### Installation
    $ git clone https://github.com/abibbs/friendlychat.git
    $ cd friendlychat
    $ cd friendlychat-frontend
    $ cd ..
    $ cd friendlychat-backend
    $ npm install

Create a `.env` file in `friendlychat-backend` with your [Deepgram](https://deepgram.com/) and [OpenAI](https://openai.com/) API keys.

    DEEPGRAM_API_KEY='YOUR_API_KEY'
    OPEN_API_KEY='YOUR_API_KEY'
    CHAT_URI='http://localhost:3000'

Create a `.env` file in `friendlychat-frontend` with the URI for the Socket.io connection.

    REACT_APP_SOCKETIO_URL='http://localhost:4000'

Start your local Redis instance.

    $ redis-server

Run the app from both `friendlychat-frontend` and `friendlychat-backend`.

    $ cd friendlychat-frontend && npm run start
    $ cd friendlychat-backend && npm run start

The client will be running on `http://localhost:3000` and the server will be running on `http://localhost:4000`.