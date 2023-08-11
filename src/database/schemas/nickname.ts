import { Schema, model } from 'mongoose';

const nickname = new Schema({
  userNum: {
    type: Number,
    required: true,
    unique: true
  },
  nickname: {
    type: String,
    required: true,
    unique: true
  },
  level: {
    type: Number,
    default: 0,
    required: true
  },
  lastGame: {
    type: String,
    default: 0,
    required: true
  }
})

export default model('nickname', nickname);
