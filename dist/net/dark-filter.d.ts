import {DarkRequest} from "../";

export interface DarkFilter {
    filterType(): string;

    filterOrder(): number;

    shouldFilter(request: DarkRequest): boolean;

    run(request: DarkRequest): boolean;
}
