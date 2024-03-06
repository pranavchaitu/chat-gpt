const { OpenAI } = require("openai") 
require('dotenv').config();
const express = require('express')
const app = express();

app.use(express.json())

const openai = new OpenAI({
  apiKey : "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"
}); 

app.post('/chat',async (req,res) => {
  try {
    const prompt = req.body.prompt;
    const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-3.5-turbo",
  });
  res.json({
    Response : completion.choices[0]
  })
  } catch (error) {
    res.status(500).json({
      msg : "something went wrong"
    })
  }
})

app.listen(3000);