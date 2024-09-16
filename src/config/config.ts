import dotenv from 'dotenv';

dotenv.config();

const MONGO_USERNAME = process.env.MONGO_USERNAME || '';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || '';
const MONGO_APPNAME= process.env.APP_NAME || '';
const MONGO_CLIENTCODE= process.env.CLIENT_CODE || '';
const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.${MONGO_CLIENTCODE}.mongodb.net/${MONGO_APPNAME}`;
const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 1337;
export const JWT_SECRET = process.env.JWT_SECRET || '';
export const BLACKLISTEDTOKENS = new Set();

export const config = {
    mongo: {
        url: MONGO_URL
    },
    server: {
        port: SERVER_PORT
    }
};
