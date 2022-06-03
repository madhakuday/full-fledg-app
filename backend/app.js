import dotenv, { config } from 'dotenv';
config();
import express from 'express';
import path from 'node:path';
import router from './Routes/router.js';

//database
import './db/db.js';

const app = express();

//Use

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', router);

const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, 'client', 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

const port = process.env.PORT || 7000;
app.listen(port, () => {
  console.log(`port is listen at http://localhost:${port}`);
});
