const { Deepgram } = require('@deepgram/sdk');
const deepgram = new Deepgram(process.env.DEEPGRAM_API_KEY);

const speechToText = async (socketIO, socket) => {
  const deepgramLive = await deepgram.transcription.live({
    interim_results: true,
    punctuate: true,
    endpointing: true,
    vad_turnoff: 500,
  });

  // Add listeners for DeepGram transciption
  deepgramLive.addListener('open', () => console.log('deepgram onOpen'));
  deepgramLive.addListener('error', error => console.log({error}));
  deepgramLive.addListener('transcriptReceived', data => {
    console.log('data', data);
    socketIO, socket.emit('transcription', data);
  });

  socket.on('audioReceived', async (event) => {
    console.log('event: ', event);
    await deepgramLive.send(event);
  });

  socket.on('disconnect', async () => {
    deepgramLive.finish();
    console.log('🔥: A user disconnected');
  });
};

module.exports = speechToText;