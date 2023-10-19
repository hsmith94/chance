import { Requests } from './Requests';

namespace Utils {
    export function makeUrl(baseUrl: string, ...parts: string[]): string {
        return baseUrl + parts.map(encodeURIComponent).join('/');
    }
}

export type ApiServiceConfig = {
    baseUrl: string;
};

export abstract class BaseApiService {
    protected http: Requests.IHttpSender;

    readonly baseUrl: string;

    constructor(
        private httpCreator: Requests.ICreator<Requests.IHttpSender>,
        config: ApiServiceConfig,
    ) {
        this.baseUrl = config.baseUrl;
        this.http = this.httpCreator.create({
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    protected makeUrl(...parts: string[]): string {
        return Utils.makeUrl(this.baseUrl, ...parts);
    }
}
