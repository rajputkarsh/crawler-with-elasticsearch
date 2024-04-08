import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import winston from 'winston';
import * as expressWinston from 'express-winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import router from './src/routes';
import { CONFIG } from './src/constants';
import { createServer, Server } from 'http';

if (process.env.NODE_ENV) {
  dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
} else {
  dotenv.config({ path: `.env.local` });
}

const app = express();

const corsOptions = {
  //To allow requests from client
  origin: CONFIG.ALLOWED_ORIGINS,
  credentials: true,
  exposedHeaders: ['set-cookie'],
};

app.use(
  expressWinston.logger({
    transports: [
      // new winston.transports.Console(),
      new DailyRotateFile({
        filename: 'logs/logs-%DATE%.log',
        datePattern: 'YYYY-MM-DD-HH',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '14d',
      }),
    ],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json(),
    ),
    meta: true,
    msg: 'HTTP {{req.method}} {{req.url}}',
    colorize: true,
    ignoreRoute: function (req, res) {
      return false;
    },
  }),
);

app.use(cors(corsOptions));
app.use(cookieParser(process.env.COOKIE_SECRET_KEY));
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));

app.use('/api', router);

const httpServer: Server = createServer(app);

httpServer.listen(process.env.PORT, async () => {
  try {
    console.log(`Server started on port = ${process.env.PORT}`);
  } catch (error) {
    console.log(`Error occurred while connecting to database.`);
    console.trace(error);
  }
});
