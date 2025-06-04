import Ajv from 'ajv';
import { config } from 'dotenv';
import { MongoClientOptions } from 'mongodb';

config();

interface MongooseConfig {
    url: string;
    options: MongoClientOptions;
}

const ajv = new Ajv({ allErrors: true });
require('ajv-formats')(ajv);

const mongooseURLSchema = {
    type: 'string',
    format: 'uri',
    pattern: '^mongodb(\\+srv)?://.*$'
};

const mongooseURLValidate = ajv.compile(mongooseURLSchema);

const validateMongoURL = (url: string | undefined): string => {
    if (!url) {
        throw new Error('MongoDB URL is not defined in environment variables');
    }

    if (!mongooseURLValidate(url)) {
        const errors = mongooseURLValidate.errors?.map(err => `${err.instancePath} ${err.message}`).join(', ');
        throw new Error(`Invalid MongoDB URL: ${errors}`);
    }

    return url;
};

export const mongooseConfig: MongooseConfig = {
    url: validateMongoURL(process.env.MONGODB_URL),
    options: {
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
        connectTimeoutMS: 10000,
        maxPoolSize: 10,
        minPoolSize: 5,
        retryWrites: true,
        retryReads: true,
        w: 'majority',
        wtimeoutMS: 2500,
        readPreference: 'primary',
        readConcern: { level: 'local' },
        writeConcern: { w: 'majority', wtimeout: 2500 }
    }
};
