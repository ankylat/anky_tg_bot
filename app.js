require("dotenv").config();
const { askAnky } = require("./lib/ai_bot");

const TelegramBot = require("node-telegram-bot-api");

// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.TELEGRAM_BOT_ANKY_BOT;

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});

// Listen for any kind of message. There are different kinds of
// messages.
bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  console.log("in here", msg);
  if (!msg?.text) return;
  if (msg?.text?.length > 320) {
    return bot.sendMessage(
      msg.chat.id,
      "that is too much text. please send me less than 320 characters"
    );
  }
  const replyFromAnky = await askAnky(msg.text);
  if (replyFromAnky.success) {
    return bot.sendMessage(msg.chat.id, replyFromAnky.ankyReply);
  } else {
    return bot.sendMessage(msg.chat.id, "sorry, there was an error");
  }
});
