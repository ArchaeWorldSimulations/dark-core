import * as notp from 'notp';


export class DarkOtp {
    constructor() {}

    public static generateToken(key: string): string {
        return notp.totp.gen(key);
    }

    public static verifyToken(token: string, key: string): boolean {
        return notp.totp.verify(token, key);
    }
 }