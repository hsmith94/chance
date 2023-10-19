import axios from 'axios';
import { BASE_URL } from '../../config/variables';
import { ApiServiceConfig, BaseApiService } from './shared/BaseApiService';
import { Requests } from './shared/Requests';

export class ApiService extends BaseApiService {
    constructor(httpCreator: Requests.ICreator<Requests.IHttpSender>, config: ApiServiceConfig) {
        super(httpCreator, { baseUrl: `${config.baseUrl}/api/` });
    }
}

export const apiService = new ApiService(axios, { baseUrl: BASE_URL });
