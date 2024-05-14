import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
// https://github.com/hapijs/joi
  
dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

export default app;
