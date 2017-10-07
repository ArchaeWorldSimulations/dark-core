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


    public setFiles(files: any): void {
        this.packet.files = files;
    }

    public addFile(name: string, content: string): void {
        this.packet.files[name] = content;
    }
}