import { DarkRequest } from "../protocol/dark-request";
import { DarkResponse } from "../protocol/dark-response";
import {DarkFilter} from "./dark-filter";
/**
 *
 */
export declare class DarkNet {
    private routes;
    private filters;
    constructor();
    registerFilter(filter: DarkFilter): void;
    registerRoute(method: string, route: string, callback: (request) => Promise<DarkResponse>): void;
    handleRequest(request: DarkRequest): Promise<DarkResponse>;

    private runFilters(request, type?);
    handleEncryptedRequest(keyManager: any, request: any): Promise<any>;
}
