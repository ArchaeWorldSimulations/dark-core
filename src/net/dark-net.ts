
import {DarkRequest} from "../protocol/dark-request";
import {DarkResponse} from "../protocol/dark-response";
import {DarkFilter} from "./dark-filter";
import {FilterResult} from "../interfaces/filter-result";

/**
 *
 */
export class DarkNet {

    private static routes: any = {};
    private static filters: Array<DarkFilter> = [];

    constructor() {
    }

    public static registerFilter(filter: DarkFilter): void {
        DarkNet.filters.push(filter);

        /*DarkNet.filters.sort((a, b) => {
            return a.filterOrder() > b.filterOrder() ? 1 : b.filterOrder() > a.filterOrder() ? -1 : 0;
        });*/
    }

    public static registerRoute(method: string, route: string, callback: (request) => Promise<DarkResponse>): void {
        if (!DarkNet.routes[method.toUpperCase()]) {
            console.log('Creating method holder', method);
            DarkNet.routes[method.toUpperCase()] = {};
        }
        console.log('Adding route', route);
        DarkNet.routes[method][route] = callback;
    }

    public static handleRequest(request: DarkRequest): Promise<DarkResponse> {
        console.log('handleRequest', request.build());
        return new Promise((resolve, reject) => {

            console.log('runFilters');
            DarkNet.runFilters(request).then(() => {
                console.log('runFilters resolved');
                if (!DarkNet.routes[request.getMethod()]) {
                    console.log('Method not registered', request.getMethod());
                    return reject();
                }

                if (!DarkNet.routes[request.getMethod()][request.getRoute()]) {
                    console.log('Route not registered');
                    return reject();
                }

                DarkNet.routes[request.getMethod()][request.getRoute()](request).then((response) => {
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

    public static handleEncryptedRequest(keyManager: any, request: any): Promise<any> {
        return new Promise((resolve, reject) => {
            DarkRequest.decrypt(keyManager, request).then((decrypted) => {
                DarkNet.handleRequest(decrypted).then((response) => {
                    resolve(response);
                }).catch((err) => {
                    reject(err);
                });
            }).catch((err) => {
                reject(err);
            });
        });
    }

    private static runFilters(request: DarkRequest): Promise<FilterResult> {

        return new Promise<FilterResult>((resolve, reject) => {

            let toRun: Array<Promise<FilterResult>> = [];

            for (let i = 0; i < DarkNet.filters.length; ++i) {
                if (DarkNet.filters[i].shouldFilter(request)) {
                    console.log('Push filter promise');
                    toRun.push(DarkNet.filters[i].run(request));
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
}