
import {DarkRequest} from "../protocol/dark-request";
import {DarkResponse} from "../protocol/dark-response";
import {DarkFilter} from "./dark-filter";
import {FilterResult} from "../interfaces/filter-result";

/**
 *
 */
export class DarkNet {

    private routes: any;
    private filters: Array<DarkFilter>;

    constructor() {
        this.routes = {};
        this.filters = [];
    }

    public registerFilter(filter: DarkFilter): void {
        this.filters.push(filter);

        /*this.filters.sort((a, b) => {
            return a.filterOrder() > b.filterOrder() ? 1 : b.filterOrder() > a.filterOrder() ? -1 : 0;
        });*/
    }

    public registerRoute(method: string, route: string, callback: (request) => Promise<DarkResponse>): void {
        if (!this.routes[method.toUpperCase()]) {
            console.log('Creating method holder', method);
            this.routes[method.toUpperCase()] = {};
        }
        console.log('Adding route', route);
        this.routes[method][route] = callback;
    }

    public handleRequest(request: DarkRequest): Promise<DarkResponse> {
        console.log('handleRequest', request.build());
        return new Promise((resolve, reject) => {

            console.log('runFilters');
            this.runFilters(request).then(() => {
                console.log('runFilters resolved');
                if (!this.routes[request.getMethod()]) {
                    console.log('Method not registered', request.getMethod());
                    return reject();
                }

                if (!this.routes[request.getMethod()][request.getRoute()]) {
                    console.log('Route not registered');
                    return reject();
                }

                this.routes[request.getMethod()][request.getRoute()](request).then((response) => {
                    resolve(response);
                }).catch((err) => {
                    console.log('Route rejected');
                    reject(err);
                });

            }).catch((result) => {
                console.log('runFilters rejected', result);
                reject(result);
            });

        });
    }

    private runFilters(request: DarkRequest): Promise<FilterResult> {

        return new Promise<FilterResult>((resolve, reject) => {

            let toRun: Array<Promise<FilterResult>> = [];

            for (let i = 0; i < this.filters.length; ++i) {
                if (this.filters[i].shouldFilter(request)) {
                    console.log('Push filter promise');
                    toRun.push(this.filters[i].run(request));
                }
            }


            Promise.all(toRun).then((values) => {
                console.log('Filters all finished');
                for (let i = 0; i < values.length; ++i) {
                    console.log(values[i].filterName, values[i].success);
                    if (!values[i].success) {
                        return reject({filterName: values[i].filterName, success: values[i].success});
                    }
                }
                resolve({success: true});
            });
        });
    }

    public handleEncryptedRequest(keyManager: any, request: any): Promise<any> {
        return new Promise((resolve, reject) => {
            DarkRequest.decrypt(keyManager, request).then((decrypted) => {
                this.handleRequest(decrypted).then((response) => {
                    resolve(response);
                }).catch((err) => {
                    reject(err);
                });
            }).catch((err) => {
                reject(err);
            });
        });
    }
}