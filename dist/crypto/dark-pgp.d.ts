export declare class DarkPgp {
    constructor();
    static createKeys(username: string): Promise<any>;
    static encrypt(to: any, body: any): Promise<string>;
    static decrypt(keyManager: any, message: string): Promise<any>;
    static importKey(key: string, password?: string): Promise<any>;
    static exportPublicKey(keyPair: any): Promise<any>;
    static exportPrivateKey(keyPair: any, password?: string): Promise<any>;
}
