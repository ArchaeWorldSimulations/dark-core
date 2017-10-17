import { DarkPacket } from './dark-packet';
export declare class DarkResponse extends DarkPacket {
    constructor(status: number);
    getStatus(): number;
    setHeaders(headers: any): DarkResponse;
    addHeader(name: string, value: any): DarkResponse;
    setBody(body: any): DarkResponse;
    static decrypt(keyManager: any, encrypted: any): Promise<DarkResponse>;
    static parse(packet: any): DarkResponse;
}
