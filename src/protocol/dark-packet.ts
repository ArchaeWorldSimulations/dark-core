
export class DarkPacket {

    protected packet: any;

    constructor() {
        this.packet = {
            headers: {},
            body: {},
        };
    }

    public setHeaders(headers: any): void {
        this.packet.headers = headers;
    }

    public addHeader(key: string, value: any): void {
        this.packet.headers[key] = value;
    }

    public setBody(body: any): void {
        this.packet.body = body;
    }


    public build(): any {
        return this.packet;
    }
}