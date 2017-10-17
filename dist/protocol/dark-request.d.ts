import { DarkPacket } from './dark-packet';
export declare class DarkRequest extends DarkPacket {
    static GET: string;
    static POST: string;
    static PUT: string;
    static DELETE: string;
    constructor(method: string, route: string, params?: any);
    getMethod(): string;
    getRoute(): string;
    getParams(): any;
    getParam(name: string): any;
    hasParam(name: string): boolean;
    getFiles(): any;
    getFile(name: string): string;
    hasFile(name: string): boolean;
    setFiles(files: any): DarkRequest;
    addFile(name: string, content: string): DarkRequest;
    setHeaders(headers: any): DarkRequest;
    addHeader(name: string, value: any): DarkRequest;
    setBody(body: any): DarkRequest;
    static decrypt(keyManager: any, encrypted: any): Promise<DarkRequest>;
    static parse(packet: any): DarkRequest;
}
