require('dotenv').config();

const express = require('express');
const app = express();
const http = require('http').Server(app);
const cors = require('cors');
const redis = require('redis');
const PORT = 4000;

const checkMessageCache = require('../utils/checkMessageCache.js');
const speechToText = require('../utils/speechToText.js');

const socketIO = require('socket.io')(http, {
  cors: {
    origin: process.env.CHAT_URI,
  }
});

const negative = {
  'Negative': 1,
  'negative': 2,
};

let redisClient;

(async () => {
  redisClient = redis.createClient(6999);
  
  redisClient.on('error', (error) => console.error(`Error: ${error}`));

  await redisClient.connect();
})();

app.use(cors());

socketIO.on('connection', async (socket) => {
  // Begin deepgram setup
  await speechToText(socketIO, socket);
  
  console.log(`⚡: ${socket.id} user just connected!`);

  // Listen for new messages from the chat
  socket.on('message', async (data) => {
    let sentiment = await checkMessageCache(redisClient, data);

    console.log('Sentiment: ', sentiment);
    
    // Emit message to the chat if it doesn't contain negative sentiment
    if (negative[sentiment]) {
      socketIO.emit('negativeMessageReceived', data);
    } else {
      socketIO.emit('messageResponse', data);
    }
  });
});

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});