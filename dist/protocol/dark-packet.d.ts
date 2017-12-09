import {IPacket} from "./ipacket";
/**
 *
 */
export declare class DarkPacket {
    protected packet: any;
    constructor();
    getHeaders(): any;
    getHeader(name: string): any;
    hasHeader(name: string): boolean;
    getBody(): any;
    setHeaders(headers: any): DarkPacket;
    addHeader(name: string, value: any): DarkPacket;
    setBody(body: any): DarkPacket;
    build(): IPacket;
    encrypt(to: any): Promise<IPacket>;
    protected getPacket(): any;
    static decrypt(keyManager: any, encrypted: any): Promise<any>;
}
