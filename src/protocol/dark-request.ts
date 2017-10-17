import {DarkPacket} from './dark-packet';


export class DarkRequest extends DarkPacket {

    constructor(method: string, route: string, params?: any) {
        super();
        this.packet.request = {
            method: method || 'get',
            route: route,
            params: params || {}
        };
        this.packet.files = {};
    }

    public getMethod(): string {
        return this.packet.request.method;
    }

    public getRoute(): string {
        return this.packet.request.route;
    }

    public getParams(): any {
        return this.packet.request.params;
    }

    public getParam(name: string): any {
        return this.packet.request.params[name];
    }

    public hasParam(name: string): boolean {
        return !!this.packet.request.params[name];
    }

    public getFiles(): any {
        return this.packet.files;
    }

    public getFile(name: string): string {
        return this.packet.files[name];
    }

    public hasFile(name: string): boolean {
        return !!this.packet.files[name];
    }

    public setFiles(files: any): DarkRequest {
        this.packet.files = files;
        return this;
    }

    public addFile(name: string, content: string): DarkRequest {
        this.packet.files[name] = content;

        return this;
    }

    /* @Override */
    public setHeaders(headers: any): DarkRequest {
        super.setHeaders(headers);
        return this;
    }

    /* @Override */
    public addHeader(name: string, value: any): DarkRequest {
        super.addHeader(name, value);
        return this;
    }

    /* @Override */
    public setBody(body: any): DarkRequest {
        super.setBody(body);
        return this;
    }

    public static parse(packet: any): DarkRequest {
        return new DarkRequest(packet.request.method, packet.request.route, packet.request.params || {})
            .setFiles(packet.files || {}).setHeaders(packet.headers || {}).setBody(packet.body || {});
    }
}