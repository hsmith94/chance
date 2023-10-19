export namespace Requests {
    export interface IHttpSender {
        get<T = any>(url: string, config?: any): Promise<T>;
        post<T = any>(url: string, data?: any, config?: any): Promise<T>;
        put<T = any>(url: string, data?: any, config?: any): Promise<T>;
        delete<T = any>(url: string, data?: any, config?: any): Promise<T>;
    }

    export type ICreatorConfig = {
        timeout?: number;
        headers?: { [x: string]: string };
    };

    export interface ICreator<T extends IHttpSender = IHttpSender> {
        create(config?: ICreatorConfig): T;
    }
}
