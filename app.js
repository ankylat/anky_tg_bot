require("dotenv").config();
const { askAnky } = require("./lib/ai_bot");

const TelegramBot = require("node-telegram-bot-api");

const token = process.env.TELEGRAM_BOT_ANKY_BOT;

const bot = new TelegramBot(token, { polling: true });

bot.on("message", async (msg) => {
  if (msg.text.length > 320) {
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
