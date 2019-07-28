import Bot from '../../core/bot.mjs';

const bot = new Bot();
const handleTgMsg = async (req, res) => {
  bot.handle(req.body);
  res.sendStatus(200);
};
export default handleTgMsg;
