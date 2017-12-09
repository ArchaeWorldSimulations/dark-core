import {DarkPacket} from './dark-packet';


export class DarkResponse extends DarkPacket {

    constructor(status: number) {
        super();
        this.packet.response = {
            status: status || 200
        };
    }

    public getStatus(): number {
        return this.packet.response.status;
    }

    /* @Override */
    public setHeaders(headers: any): DarkResponse {
        super.setHeaders(headers);
        return this;
    }

    /* @Override */
    public addHeader(name: string, value: any): DarkResponse {
        super.addHeader(name, value);
        return this;
    }

    /* @Override */
    public setBody(body: any): DarkResponse {
        super.setBody(body);
        return this;
    }

    /* @Override */
    public static decrypt(keyManager: any, encrypted: any): Promise<DarkResponse> {
        return new Promise((resolve, reject) => {
            super.decrypt(keyManager, encrypted).then((decrypted) => {
                resolve(DarkResponse.parse(decrypted));
            }).catch((err) => {
                reject(err);
            });
        });
    }

    public static parse(packet: any): DarkResponse {
        let p = packet.dtp || packet;
        return new DarkResponse(p.response.status)
            .setHeaders(p.headers || {}).setBody(p.body || {});
    }
}