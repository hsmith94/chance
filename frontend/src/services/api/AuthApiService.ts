import axios, { AxiosResponse } from 'axios';
import { BASE_URL } from '../../config/variables';
import { ApiServiceConfig, BaseApiService } from './shared/BaseApiService';
import { Requests } from './shared/Requests';
import { extract } from './shared/extract';
import { rethrow } from './shared/rethrow';

type AR<T> = AxiosResponse<T>; // TODO: Refactor http sender to intrinsically extract data from `AxiosResponse`

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
        return this.http
            .post<AR<any>>(this.makeUrl('register', username, password))
            .then(extract)
            .catch(rethrow);
    }
    public signInUser(username: string, password: string): Promise<UserInfoSignIn> {
        return this.http
            .post<AR<UserInfoSignIn>>(this.makeUrl('sign-in', username, password))
            .then(extract)
            .catch(rethrow);
    }
}

export const authApiService = new AuthApiService(axios, { baseUrl: BASE_URL });
