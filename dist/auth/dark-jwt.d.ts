export declare class DarkJwt {
    constructor();

    static createJwt(content: any, secret: string): string;

    static verifyJwt(token: string, secret: string): any;
}
