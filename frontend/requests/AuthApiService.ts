import axios from 'axios';
import { BASE_URL } from '../config/variables';
import { ApiServiceConfig, BaseApiService } from './abstract/BaseApiService';
import { Requests } from './abstract/Requests';

export type UserInfo = {
    id: string;
    username: string;
    picture?: string;
};

export type UserInfoSignIn = UserInfo & {
    token: string;
};

export class AuthApiService extends BaseApiService {
    constructor(httpCreator: Requests.ICreator<Requests.IHttpSender>, config: ApiServiceConfig) {
        super(httpCreator, { baseUrl: `${config.baseUrl}/auth-api/` });
    }
    public registerUser(username: string, password: string): Promise<any> {
        return this.http.post(this.makeUrl('register', username, password));
    }
    public signInUser(username: string, password: string): Promise<any> {
        return this.http.post<UserInfoSignIn>(this.makeUrl('sign-in', username, password));
    }
}

export const authApiService = new AuthApiService(axios, { baseUrl: BASE_URL });
