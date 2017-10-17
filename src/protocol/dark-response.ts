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

    public static parse(packet: any): DarkResponse {
        return new DarkResponse(packet.response.status)
            .setHeaders(packet.headers || {}).setBody(packet.body || {});
    }
}