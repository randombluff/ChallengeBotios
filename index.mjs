import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';

import bodyParser from 'body-parser';
import i18n from 'i18n';
import routers from './routes/index.mjs';
import { log, logE } from './utils/log.mjs';

dotenv.config();
const port = process.env.PORT;

i18n.configure({
  locales: ['en'],
  directory: './localization',
});
const app = express();

app.use(bodyParser.json());

app.listen(port, async () => {
  log(`Express server is listening on ${port}`);
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      ssl: true,
      poolSize: 2,
      useNewUrlParser: true,
    });
    routers.forEach(router => router && app.use(router));
  } catch (e) {
    logE(e);
    process.exit(1);
  }
});

export default { app };
