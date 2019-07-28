import express from 'express';
import handleTgMsg from './handlers/index.mjs';

const wHookRouter = express.Router();

wHookRouter.post(`/bot/${process.env.TELEGRAM_TOKEN}`, handleTgMsg);
export default wHookRouter;
