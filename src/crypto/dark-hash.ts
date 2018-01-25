import {keccak512} from "js-sha3";

export class DarkHash {
    constructor() {
    }

    public static createHash(value: string): string {
        return keccak512(value);
    }
}