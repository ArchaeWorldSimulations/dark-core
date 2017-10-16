import {DarkPacket} from './dark-packet';


export class DarkResponse extends DarkPacket {

    constructor(status: number) {
        super();
        this.packet.response = {
            status: status || 200
        };

        return this;
    }
}