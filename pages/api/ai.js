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
  if (!req.body) {
    res.status(400).json({ error: "No body" });
    return;
  }
  if (!req.body.supplies || !req.body.colors) {
    res.status(400).json({ error: "Missing supplies or colors" });
    return;
  }
  console.log(req.body.supplies.join("\n"));
  console.log(req.body.colors.join("\n"));
  const system = `You are an assistant who suggests art projects for students. Each student will provide a list of supplies they have and a list of colors they want to use, in hexadecimal form. Generate one artwork idea (prefer concrete drawings over abstract ones), using the supplies and colors provided. When responding, never make vague references to "colors" or "hex codes," always use the actual color names.

    Respond in the following format (replace the <text in angle brackets> with your response):

    ---
    <title of the project>
    ---
    <imagine you are looking at the final artwork. describe what it looks like, including colors. one sentence only>
    ---
    <list materials needed for the project, one on each line>
    ---
    <list of steps to complete the project, with one step per line>
    ---
    `;
  const user = `Here is the list of supplies I have:
${req.body.supplies.join("\n")}

Here is the list of colors I have:
${req.body.colors.join("\n")}
`;
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
  console.log(response.data.usage);
  const data = response.data.choices[0].message?.content;
  const [, title, description, materials, steps] = data
    .split("---")
    .map((x) => x.trim());
  const image = await openai.createImage({
    prompt: `This is a piece of artwork drawn by a professional artist. ${description}`,
    n: 1,
    size: "1024x1024",
  });
  const imageUrl = image.data.data[0].url;
  console.log(imageUrl);
  res.status(200).json({
    title,
    description,
    materials,
    steps,
    imageUrl,
  });
  return;
}
