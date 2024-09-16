import express,{ Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { config } from './config/config';
import Logging from './library/logging';
import http from 'http';

const app = express();
const port = process.env.PORT || 1947;
app.use(cors());
const log = console.log;
const name = "Bhuvan"

// app.get('/', (req, res) => {
//   Logging.info(`Connected to mongoDB.`);
//   Logging.warn('Hello world!');
//   console.log(`Hello`+name);
  

//   res.send('Hello World!');
  
// });

mongoose
    .connect(config.mongo.url, { retryWrites: true, w: 'majority', appName:'Cluster0' })
    .then(() => {
        Logging.warn(`Connected to mongoDB.`);
        Logging.log(`Server is running!!!.`);
        startServer();
    })
    .catch((err) => {
        Logging.error('Unable to connect.');
        Logging.info(err);
    });

// app.listen(port, () => { 
//   Logging.log(`Connected to Nodejs.`);
//   console.log(`Server running on port ${port}`);

// });

const startServer = () => {
  app.use((req, res, next) => {
      /** Log the Request */
      Logging.info(`incomming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

      res.on('finish', () => {
          /** Log the Response */
          Logging.info(`incomming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`);
      });

      next();
  });

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  /** Rules of our API */
  app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

      if (req.method == 'OPTIONS') {
          res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
          return res.status(200).json({});
      }

      next();
  });

  /** Routes */

  app.get('/', (req: Request, res: Response) => {
      res.json({ message: 'Hello Bhuvan! Welcome to AppzStores!' });
  });

  app.get('/api/data', (req: Request, res: Response) => {
      res.json({ message: 'Hello Bhuvan! Welcome to AppzStores!' });
  });


  app.use((req, res, next) => {
      const error = new Error('not found');
      Logging.error(error);
      return res.status(400).json({ message: error.message });
  });
  
  Logging.Success(config.server.port);
  http.createServer(app).listen(config.server.port, () => Logging.info(`Server is running on port ${config.server.port}.`));
};
