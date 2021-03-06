
import {DarkPgp} from "../crypto/dark-pgp";
import {IPacket} from "./ipacket";

/**
 *
 */
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


    public build(): IPacket {
        return {dtp: this.packet};
    }

    public encrypt(to: any): Promise<IPacket> {
        return new Promise((resolve, reject) => {
            DarkPgp.encrypt(to, JSON.stringify(this.getPacket())).then((encrypted) => {
                resolve({dtp: encrypted});
            }).catch((err) => {
                reject(err);
            });
        });
    }

    protected getPacket(): any {
        return this.packet;
    }

    public static decrypt(keyManager: any, encrypted: any): Promise<any> {
        return new Promise((resolve, reject) => {
            DarkPgp.decrypt(keyManager, encrypted.dtp || encrypted).then((decrypted) => {
                resolve(JSON.parse(decrypted));
            }).catch((err) => {
                reject(err);
            });
        });
    }
}