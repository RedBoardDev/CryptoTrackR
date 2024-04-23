import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(helmet());

export default app;
