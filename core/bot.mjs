import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';
import User from '../schemas/user.mjs';
import { log } from '../utils/log.mjs';

dotenv.config();

export default class Bot {
  constructor() {
    const token = process.env.TELEGRAM_TOKEN;
    const url = process.env.URL;
    this.bot = new TelegramBot(token);
    this.bot.setWebHook(`${url}/bot/${token}`);
  }

  async handle(msg) {
    log(msg);
    const {
      message: {
        from: {
          id, is_bot: isBot, first_name: firstName, username, language_code: languageCode,
        },
      },
    } = msg;
    const user = await new User({
      id,
      firstName,
      isBot,
      username,
      languageCode,
    })
      .save()
      .catch((e) => {
        if (e.code === 11000) {
          return log('[User exist]');
        }
        throw e;
      });
    this.bot.processUpdate(msg);
  }
}
