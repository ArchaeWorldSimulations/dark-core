import {DarkRequest, FilterResult} from "../";

/**
 * Defines the DarkFilter object
 * DarkFilter is based on the Spring Zuul filter
 */
export interface DarkFilter {
    /*
        pre filters are executed before the request is routed,
        route filters can handle the actual routing of the request,
        post filters are executed after the request has been routed, and
        error filters execute if an error occurs in the course of handling the request.
     */
    filterType(): string; //pre
    filterOrder(): number;

    shouldFilter(request: DarkRequest): boolean;

    run(request: DarkRequest): Promise<FilterResult>;
}