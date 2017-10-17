
import {DarkRequest} from "../protocol/dark-request";
import {DarkResponse} from "../protocol/dark-response";

export class DarkNet {

    private routes: any;

    constructor() {
        this.routes = {};
    }

    // darkNet.registerRoute('get', 'check', (req) => { /* ... */ });
    public registerRoute(method: string, route: string, callback: any): void {
        this.routes[method] = {};
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
}