export declare class DarkPgp {
    constructor();
    /**
     * Created a key pair for a user
     * @param {string} username
     * @returns {Promise<any>}
     */
    static createKeys(username: string): Promise<any>;
    /**
     * Encrypt an object with a public key
     * @param to the public key of the recipient
     * @param body the object to encrypt
     * @returns {Promise<string>}
     */
    static encrypt(to: any, message: string): Promise<string>;
    /**
     * Decrypt a message
     * @param keyManager an imported private key
     * @param {string} message
     * @returns {Promise<any>}
     */
    static decrypt(keyManager: any, message: string): Promise<any>;
    static importKey(key: string, password?: string): Promise<any>;
    static exportPublicKey(keyPair: any): Promise<any>;
    static exportPrivateKey(keyPair: any, password?: string): Promise<any>;
}
