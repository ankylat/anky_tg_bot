require("dotenv").config();
const { askAnky } = require("./lib/ai_bot");

const TelegramBot = require("node-telegram-bot-api");

const token = process.env.TELEGRAM_BOT_ANKY_BOT;
const url = process.env.WEBHOOK_URL;

const bot = new TelegramBot(token, {
  webHook: { port: process.env.PORT || 443 },
});

bot.setWebHook(`${url}/${token}`);

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  console.log("the chat id is: ", chatId);
  if (!msg?.text) return;
  if (msg?.text?.length > 320) {
    return bot.sendMessage(
      msg.chat.id,
      "that is too much text. please send me less than 320 characters"
    );
  }
  const replyFromAnky = await askAnky(msg.text);
  if (replyFromAnky.success) {
    return bot.sendMessage(msg.chat.id, replyFromAnky);
  } else {
    return bot.sendMessage(msg.chat.id, "sorry, there was an error");
  }
});
