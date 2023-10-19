import { HEROKU_URL, LOCAL_URL } from './constants';

export const BASE_URL = process.env.NODE_ENV === 'development' ? LOCAL_URL : HEROKU_URL;
