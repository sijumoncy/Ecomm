import express from 'express'
import helmet from "helmet";
import cors from 'cors'
import { config } from './config/config';
import routes from './routes';

const app = express()

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// enable cors
app.use(cors());
app.options('*', cors());

// routes
const baseUrl = config.apiBaseUrl
app.use(`${baseUrl}/`, routes)

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
    res.status(404).json({message:"Not found"})
});


export default app;