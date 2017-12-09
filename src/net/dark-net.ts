
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

        this.filters.sort((a, b) => {
            return a.filterOrder() > b.filterOrder() ? 1 : b.filterOrder() > a.filterOrder() ? -1 : 0;
        });
    }

    public registerRoute(method: string, route: string, callback: (request) => Promise<DarkResponse>): void {
        if (!this.routes[method.toUpperCase()])
            this.routes[method.toUpperCase()] = {};
        this.routes[method][route] = callback;
    }

    public handleRequest(request: DarkRequest): Promise<DarkResponse> {
        return new Promise((resolve, reject) => {

            let filterResult: FilterResult = this.runFilters(request, 'pre');
            if (!filterResult.success) {
                return reject(filterResult);
            }

            if (!this.routes[request.getMethod()])
                return reject();

            if (!this.routes[request.getMethod()][request.getRoute()])
                return reject();

            this.routes[request.getMethod()][request.getRoute()](request).then((response) => {
                resolve(response);
            }).catch((err) => {
                reject(err);
            });
        });
    }

    private runFilters(request: DarkRequest, type?: string): FilterResult {
        if (!type)
            type = 'pre';
        for (let i = 0; i < this.filters.length; ++i) {
            if (this.filters[i].filterType() !== type)
                continue;
            if (this.filters[i].shouldFilter(request)) {
                if (!this.filters[i].run(request)) {
                    return {success: false, filterName: this.filters[i].constructor.name};
                }
            }
        }

        return {success: true};
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