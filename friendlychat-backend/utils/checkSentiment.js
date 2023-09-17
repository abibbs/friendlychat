const openai = require('openai').OpenAI;

const oa = new openai({
  apiKey: process.env.OPEN_API_KEY,
});

const checkSentiment = async (message) => {
  let sentiment;
  
  try {
    const response = await oa.completions.create({
      model: 'text-davinci-003',
      prompt: `${message} What is the sentiment of this statement? Only return positive, neutral or negative and no other text.`,
      max_tokens: 50,
      n: 1,
      stop: null,
      temperature: 0.7, // A higher temperature is needed for more confident results
    });

    sentiment = response.choices[0].text.trim(); // API docs: https://platform.openai.com/docs/api-reference/completions/create
    
    return sentiment;
  } catch(error) {
    console.error(error);
    
    return error;
  }
};

module.exports = checkSentiment;