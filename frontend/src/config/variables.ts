import { HEROKU_URL, LOCAL_URL } from './constants';
import { ENV } from './environment';

export const BASE_URL = ENV === 'development' ? LOCAL_URL : HEROKU_URL;

console.log('BASE_URL', BASE_URL);
