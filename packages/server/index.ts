import express from 'express';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import router from './routes';

dotenv.config();

const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(router);

app.listen(port, () => {
    console.log(`web server is running on http://localhost:${3000}`);
});
