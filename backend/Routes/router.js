import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import axios from 'axios';

///schema

import userdata from '../schema/Schema.js';
import { log } from 'console';

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
    res.status(404).send({ Error: 'email password does not match' });
  }
});

router.get('/cryptoapi', async (req, res) => {
  try {
    const data = await axios.get(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true'
    );

    res.send(data.data);
  } catch (error) {
    res.status(404).send({ Error: error.message });
  }
});

router.post('/movieapi', async (req, res) => {
  try {
    const { type, page } = req.body;

    const api = `https://api.themoviedb.org/3/trending/${type}/day?api_key=96eb55edd584f0e95c33280b79b8468b&page=${page}`;

    const data = await axios.get(api);
    res.send(data.data);
  } catch (error) {
    res.status(404).send({ Error: error.message });
  }
});

router.post('/singmovieapi', async (req, res) => {
  try {
    const { page } = req.body;

    const api = `https://api.themoviedb.org/3/trending/all/day?api_key=96eb55edd584f0e95c33280b79b8468b&page=${page}`;

    const data = await axios.get(api);

    res.send(data.data);
  } catch (error) {
    res.status(404).send({ Error: error.message });
  }
});

router.post('/singmovievideoapi', async (req, res) => {
  try {
    const { page, media_type, id } = req.body;

    const api = `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=96eb55edd584f0e95c33280b79b8468b&page=${page}`;

    const data = await axios.get(api);

    res.send(data.data);
  } catch (error) {
    res.status(404).send({ Error: error.message });
  }
});

export default router;
