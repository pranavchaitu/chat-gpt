const express = require("express");
//dotnenv for using .env - enviroment variables
require("dotenv").config();
const { OpenAI } = require("openai");

const app = express();
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY,
});

app.post("/chat", async (req, res) => {
  try {
    const prompt = req.body.prompt;
    const res = await openai.createChatCompletion({
      model: "text-davinci-003",
      prompt,
      max_tokens: 64,
      temperature: 0.7,
      stop: ["\n"],
      n: 1,
    });
		res.json({
			response : res.data.choices[0].text
		})
  } catch (error) {
    console.log(error);
  }
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server is listening on PORT ${port}`));
