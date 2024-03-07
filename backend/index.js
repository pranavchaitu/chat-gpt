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
    const completion = await openai.chat.completions.create({
      messages: [{"role": "user", "content": "Who won the world series in 2020?"},],
      model: "gpt-3.5-turbo",
    });
  res.json({
    Response : completion.choices[0]
  })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg : "something went wrong"
    })
  }
})

app.listen(3000);