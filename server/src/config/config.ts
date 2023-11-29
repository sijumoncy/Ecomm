import dotenv from 'dotenv';
import path from 'path';
import Joi from 'joi';

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development').required(),
    PORT: Joi.number().default(8000),
    API_URL: Joi.string().description('base url o api with version').default('/api/v1'),
    MONGO_URI: Joi.string().required().description('Mongo DB url'),
    MONGO_DB_NAME: Joi.string().required().description('Mongo DB name')
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const config = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  apiBaseUrl : envVars.API_URL,
  mongo: {
    url: envVars.MONGO_URI,
    dbName: envVars.MONGO_DB_NAME
  }
};
