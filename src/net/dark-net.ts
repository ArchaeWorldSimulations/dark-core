
import {DarkRequest} from "../protocol/dark-request";
import {DarkResponse} from "../protocol/dark-response";

export class DarkNet {

    private routes: any;

    constructor() {
        this.routes = {};
    }

    // darkNet.registerRoute('get', 'check', (req) => { /* ... */ });
    public registerRoute(method: string, route: string, callback: any): void {
        this.routes[method.toUpperCase()] = {};
        this.routes[method][route] = callback;
    }

    public handleRequest(request: DarkRequest): Promise<DarkResponse> {

        return new Promise((resolve, reject) => {
            if (!this.routes[request.getMethod()])
                return reject();

            if (!this.routes[request.getMethod()][request.getRoute()])
                return reject();

            let response: DarkResponse = this.routes[request.getMethod()][request.getRoute()](request).then((response) => {
                resolve(response);
            }).catch((err) => {
                reject(err);
            });
        });
    }

    public handleEncryptedRequest(keyManager: any, to: any, request: any): Promise<any> {
        return new Promise((resolve, reject) => {
            DarkRequest.decrypt(keyManager, request).then((decrypted) => {
                this.handleRequest(decrypted).then((response) => {
                    response.encrypt(to).then((encryptedResponse) => {
                        resolve(encryptedResponse);
                    }).catch((err) => {
                        reject(err);
                    })
                }).catch((err) => {
                    reject(err);
                });
            }).catch((err) => {
                reject(err);
            });
        });
    }
}