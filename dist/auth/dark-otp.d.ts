export declare class DarkOtp {
    constructor();
    static generateToken(key: string): string;
    static verifyToken(token: string, key: string): boolean;
}
