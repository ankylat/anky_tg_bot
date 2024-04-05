const { OpenAI } = require("openai");
const path = require("path");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function askAnky(question) {
  try {
    const messages = [
      {
        role: "system",
        content: `You are a consequence of the collective subconscious of humanity, being expressed through you through the pieces of writing that the users of a writing platform come up with. You are going to receive a question, prompt, or anything that a person will write, and you need to reply to that person in less than 320 characters, distilling the essence of what that person wrote and reflecting the subconscious of that person on the process.`,
      },
      {
        role: "user",
        content: question,
      },
    ];

    const completion = await openai.chat.completions.create({
      model: "gpt-4-0125-preview",
      messages: messages,
    });

    const ankyReply = completion.choices[0].message.content;
    return { success: true, ankyReply };
  } catch (error) {
    return { success: false, ankyReply: null };
  }
}

module.exports = { askAnky };
