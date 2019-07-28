import mongoose from 'mongoose';
import collections from './collections.mjs';
import { log } from '../utils/log.mjs';

const { model, Schema } = mongoose;

class UserModel extends Schema {
  constructor() {
    const user = super({
      id: {
        type: Number,
        unique: true,
        required: [true, "can't be blank"],
        index: true,
      },
      isBot: Boolean,
      firstName: String,
      lastName: String,
      username: String,
      languageCode: String,
      createdAt: { type: Date, default: new Date() },
    });
    // disabled because of arrow functions not working correctly here
    // eslint-disable-next-line func-names
    user.pre('save', function (next) {
      log('[UserModel][save attempt]: ', this);
      next();
    });
    user.loadClass(UserModel);
  }
}

const User = model(collections.user, new UserModel());

export default User;
