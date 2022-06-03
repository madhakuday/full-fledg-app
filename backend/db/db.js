import e from 'express';
import mongoose from 'mongoose';

export default mongoose.connect(
  'mongodb+srv://madhakuday:123@cluster0.jddf6.mongodb.net/all_app?retryWrites=true&w=majority',
  (err) => {
    if (err) {
      console.log('err');
    }
    console.log('database done');
  }
);
