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

    private runFilters(request, type?);
    registerRoute(method: string, route: string, callback: (request) => Promise<DarkResponse>): void;
    handleRequest(request: DarkRequest): Promise<DarkResponse>;
    handleEncryptedRequest(keyManager: any, request: any): Promise<any>;
}
