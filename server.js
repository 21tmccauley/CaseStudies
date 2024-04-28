const express = require('express');
const axios = require('axios');
const app = express();
require('dotenv').config();

const port = process.env.PORT || 3031;

app.use(express.json());
app.use(express.static('public'));

app.post('/generate-case-study', async (req, res) => {
  try {
    const prompt = req.body.prompt;
    const apiKey = process.env.API_KEY;
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        // Uncomment and provide the values if using a specific organization or project
        // 'OpenAI-Organization': 'YOUR_ORG_ID',
        // 'OpenAI-Project': 'YOUR_PROJECT_ID',
      },
    });
    const generatedText = response.data.choices[0].message.content.trim();
    res.json({ text: generatedText });
  } catch (error) {
    console.error('Error generating case study:', error);
    res.status(500).json({ error: 'Failed to generate case study' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});