import { LOCAL_URL, PUBLIC_URL } from './constants';
import { ENV } from './environment';

export const BASE_URL = ENV === 'development' ? LOCAL_URL : PUBLIC_URL;

console.log('BASE_URL', BASE_URL);
