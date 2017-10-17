import { DarkRequest } from "../protocol/dark-request";
import { DarkResponse } from "../protocol/dark-response";
/**
 *
 */
export declare class DarkNet {
    private routes;
    constructor();
    registerRoute(method: string, route: string, callback: (request) => Promise<DarkResponse>): void;
    handleRequest(request: DarkRequest): Promise<DarkResponse>;
    handleEncryptedRequest(keyManager: any, to: any, request: any): Promise<any>;
}
