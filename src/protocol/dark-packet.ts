
export class DarkPacket {

    protected packet: any;

    constructor() {
        this.packet = {
            headers: {},
            body: {},
        };

        return this;
    }

    public setHeaders(headers: any): DarkPacket {
        this.packet.headers = headers;

        return this;
    }

    public addHeader(key: string, value: any): DarkPacket {
        this.packet.headers[key] = value;

        return this;
    }

    public setBody(body: any): DarkPacket {
        this.packet.body = body;

        return this;
    }


    public build(): any {
        return this.packet;
    }
}