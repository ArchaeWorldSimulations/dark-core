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

        return this;
    }


    public setFiles(files: any): DarkRequest {
        this.packet.files = files;
        return this;
    }

    public addFile(name: string, content: string): DarkRequest {
        this.packet.files[name] = content;

        return this;
    }
}