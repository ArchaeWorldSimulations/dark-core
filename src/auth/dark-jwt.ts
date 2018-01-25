import {jwt} from "jsonwebtoken";


export class DarkJwt {
    constructor() {}

    public static createJwt(content: any, secret: string): string {
        return jwt.sign(content, secret);
    }

    public static verifyJwt(token: string, secret: string): any {
        return jwt.verify(token, secret);
    }
}