import connectDB from './db/conn';
import { config } from './config/config';
import logger from './config/logger';
import app from './app'

let server:any;

const port = config.port

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

// connect to db and start server
connectDB().then(() => {
    server = app.listen(port, () => {
        console.log(`App is Running in Port : 8000 ${port}`)
    })
}).catch((err) => {
    console.log("Server Down : ", err);
})