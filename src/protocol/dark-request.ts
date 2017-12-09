import {DarkPacket} from './dark-packet';


export class DarkRequest extends DarkPacket {

    public static GET: string = 'GET';
    public static POST: string = 'POST';
    public static PUT: string = 'PUT';
    public static DELETE: string = 'DELETE';

    constructor(method: string, route: string, params?: any) {
        super();
        this.packet.request = {
            method: method.toUpperCase(),
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

    /* @Override */
    public static decrypt(keyManager: any, encrypted: any): Promise<DarkRequest> {
        return new Promise((resolve, reject) => {
            super.decrypt(keyManager, encrypted).then((decrypted) => {
                resolve(DarkRequest.parse(decrypted));
            }).catch((err) => {
                reject(err);
            });
        });
    }

    public static parse(packet: any): DarkRequest {
        let p = packet.dtp || packet;
        return new DarkRequest(p.request.method, p.request.route, p.request.params || {})
            .setFiles(p.files || {}).setHeaders(p.headers || {}).setBody(p.body || {});
    }
}