import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

///schema

import userdata from '../schema/Schema.js';

const router = express.Router();

router.post('/registeruser', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const hasPassword = await bcrypt.hash(password, 8);
    const alldata = await userdata({ username, email, password: hasPassword });

    if (alldata) {
      await alldata.save();
      const { username, email, date, _id } = alldata;
      const token = await jwt.sign(
        { username, email, date, _id },
        'thisisasecretkryofjwt'
      );

      res.send(token);
    } else {
      console.log('error in regisetr');
    }
  } catch (err) {
    res.status(404).send({ Errorinregistration: err.message });
    console.log('erros is register ', err);
  }
});

router.post('/loginuser', async (req, res) => {
  try {
    const { email, password } = req.body;
    const checkemail = await userdata.findOne({ email: email });

    const isMatch = await bcrypt.compare(password, checkemail.password);

    if (isMatch) {
      const { _id, username, email, date } = checkemail;
      const token = jwt.sign(
        { username: username, email: email, date: date, id: _id },
        'thisisasecretkryofjwt'
      );
      console.log('after token');
      res
        .status(200)
        .send({ message: 'user login successfully', token: token });
      console.log('after res');
    } else {
      res.status(404).send({ message: 'invalid data' });
    }
  } catch (error) {
    res.status(404).send({ Error: error.message });
    console.log('error in login api', { Errorinlogin: error.message });
  }
});

export default router;
