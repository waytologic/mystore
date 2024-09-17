import express,{ Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { config } from './config/config';
import Logging from './library/logging';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';
import http from 'http';
import UserRoutes from './routes/UserRoutes';
import path from 'path';
import favicon from 'serve-favicon';


const app = express();
const port = process.env.PORT || 1947;
app.use(cors());
const log = console.log;
const name = "Bhuvan"

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
  
  /** Routes */
    
  app.use('/api', UserRoutes);
    
  // Specify the path to your favicon
  app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

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

  // Serve Swagger API docs
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  app.use((req, res, next) => {
      const error = new Error('not found');
      Logging.error(error);
      return res.status(400).json({ message: error.message });
  });
  
  Logging.Success(config.server.port);
  http.createServer(app).listen(config.server.port, () => Logging.info(`Server is running on port ${config.server.port}.`));
};
