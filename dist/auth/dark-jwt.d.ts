export declare class DarkJwt {
    constructor();

    createJwt(content: any, secret: string): string;

    verifyJwt(token: string, secret: string): any;
}
