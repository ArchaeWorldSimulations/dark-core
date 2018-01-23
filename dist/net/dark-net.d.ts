import { DarkRequest } from "../protocol/dark-request";
import { DarkResponse } from "../protocol/dark-response";
import {DarkFilter} from "./dark-filter";
/**
 *
 */
export declare class DarkNet {
    private static _instance;
    private routes;
    private filters;
    constructor();

    static getInstance(): DarkNet;
    registerFilter(filter: DarkFilter): void;
    registerRoute(method: string, route: string, callback: (request) => Promise<DarkResponse>): void;
    handleRequest(request: DarkRequest): Promise<DarkResponse>;
    handleEncryptedRequest(keyManager: any, request: any): Promise<any>;

    private runFilters(request);
}
