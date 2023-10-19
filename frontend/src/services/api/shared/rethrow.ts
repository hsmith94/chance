import { AxiosError } from 'axios';
import { omit } from 'lodash';

type FastApiHttpException = {
    detail: string;
};

type ResponseErrorInfo = {
    data?: any;
    message: string;
    status?: number;
    statusText?: string;
};

function extractResponseErrorInfo(error: AxiosError): ResponseErrorInfo {
    if (!error?.response) {
        return {
            data: undefined,
            message: error?.message,
            status: undefined,
            statusText: undefined,
        };
    }
    const data = error.response.data as FastApiHttpException;
    const status = error.response.status;
    const statusText = error.response.statusText;
    return {
        data: omit(data, ['detail']),
        message: data.detail ?? statusText,
        status,
        statusText,
    };
}

function makeApiError(error: AxiosError): Error {
    const info = extractResponseErrorInfo(error);

    const apiError = new Error(info.message);
    apiError.name = 'API Error';
    apiError.stack += '\n' + error.stack?.split('\n').slice(1).join('\n') ?? '';
    Object.assign(apiError, info);

    return apiError;
}

export function rethrow(error: AxiosError): never {
    const apiError = makeApiError(error);
    throw apiError;
}
