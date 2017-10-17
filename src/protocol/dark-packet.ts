
import {DarkPgp} from "../crypto/dark-pgp";

export class DarkPacket {

    protected packet: any;

    constructor() {
        this.packet = {
            headers: {},
            body: {},
        };
    }

    public getHeaders(): any {
        return this.packet.headers;
    }

    public getHeader(name: string): any {
        return this.packet.headers[name];
    }

    public hasHeader(name: string): boolean {
        return !!this.packet.headers[name];
    }

    public getBody(): any {
        return this.packet.body;
    }

    public setHeaders(headers: any): DarkPacket {
        this.packet.headers = headers;

        return this;
    }

    public addHeader(name: string, value: any): DarkPacket {
        this.packet.headers[name] = value;

        return this;
    }

    public setBody(body: any): DarkPacket {
        this.packet.body = body;

        return this;
    }


    public build(): any {
        return this.packet;
    }

    public encrypt(to: any): Promise<any> {
        return new Promise((resolve, reject) => {
            DarkPgp.encrypt(to, this.build()).then((encrypted) => {
                resolve({dark: encrypted});
            }).catch((err) => {
                reject(err);
            });
        });
    }

    public decrypt(keyManager: any, encrypted: any): Promise<any> {
        return new Promise((resolve, reject) => {
            DarkPgp.decrypt(keyManager, encrypted.dark).then((decrypted) => {
                resolve(decrypted);
            }).catch((err) => {
               reject(err);
            });
        });
    }
}