import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.redirect("/404");
    return;
  }
  const system =
    "You are an assistant who suggests art projects for students, based on art supplies they have. For each request, generate one artwork idea.";
  const user = "I have blue crayons, and a white pen.";
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: system,
      },
      {
        role: "user",
        content: user,
      },
    ],
  });
  const data = response.data.choices[0].message?.content;
  res.status(200).json({ response: data });
  return;
}
