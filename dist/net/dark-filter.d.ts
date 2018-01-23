import {DarkRequest, FilterResult} from "../";

/**
 * Defines the DarkFilter object
 * DarkFilter is based on the Spring Zuul filter
 */
export interface DarkFilter {
    filterType(): string;
    filterOrder(): number;
    shouldFilter(request: DarkRequest): boolean;

    run(request: DarkRequest): Promise<FilterResult>;
}
