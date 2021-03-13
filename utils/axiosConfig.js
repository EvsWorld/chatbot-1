import axios from 'axios';
import { config as appConfig } from '../config';

const api = axios.create({
  baseURL: appConfig.intentsUrl || 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
    authorization: appConfig.aiApiKey,
  },
});

module.exports = api;
