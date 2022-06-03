import mongoose from 'mongoose';

const user_data = mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  date: { type: Date, required: true, default: Date.now() },
});

export const userdata = new mongoose.model('userdata', user_data);

export default userdata;
