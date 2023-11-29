import express from 'express'
import bodyParser from 'body-parser';
import morgan from 'morgan'
import connectDB from './db/conn';
import productRoute from './routes/products'
import { config } from './config/config';
import logger from './config/logger';

const app = express()
let server:any;

const apiBaseUrl = config.apiBaseUrl
const port = config.port

// middlewares
app.use(bodyParser.json())
app.use(morgan("tiny"))


// default route
app.get(`${apiBaseUrl}/`, (req, res) => {
    res.send('App is Up and Running')
})

//routes
app.use(`${apiBaseUrl}/products`, productRoute)


const exitHandler = () => {
    if (server) {
      server.close(() => {
        logger.info('Server closed');
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  };
  
const unexpectedErrorHandler = (error:any) => {
    logger.error(error);
    exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});

// connect to db
connectDB().then(() => {
    server = app.listen(port, () => {
        console.log(`App is Running in Port : 8000 ${port}`)
    })
}).catch((err) => {
    console.log("Server Down : ", err);
})