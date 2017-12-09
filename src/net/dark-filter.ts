import {DarkRequest} from "../";

export interface DarkFilter {
    filterType(): string; //pre
    filterOrder(): number;

    shouldFilter(request: DarkRequest): boolean;

    run(request: DarkRequest): boolean;
}