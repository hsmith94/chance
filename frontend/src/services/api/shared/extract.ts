import { AxiosResponse } from 'axios';

export function extract<T>(response: AxiosResponse<T>): T {
    return response.data;
}
