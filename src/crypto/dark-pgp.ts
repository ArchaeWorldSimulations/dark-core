import * as kbpgp from 'kbpgp';
//declare const kbpgp;

export class DarkPgp {

    constructor() {
    }

    public static createKeys(username: string): Promise<any> {
        return new Promise((resolve, reject) => {
            kbpgp.KeyManager.generate_ecc({userid: username}, (err, keyPair) => {
                if (err) return reject(err);
                keyPair.sign({}, (err) => {
                    if (err) return reject(err);
                    resolve(keyPair);
                });
            });
        });
    }

    public static encrypt(to: any, body: any): Promise<string> {
        return new Promise((resolve, reject) => {
            kbpgp.box({
                encrypt_for: to,
                msg: JSON.stringify(body)
            }, (err, encrypted) => {
                if (err) return reject(err);
                resolve(encrypted);
            })
        });
    }

    public static decrypt(keyManager: any, message: string): Promise<any> {
        return new Promise((resolve, reject) => {
            kbpgp.unbox({keyfetch: keyManager, armored: message}, (err, literals) => {
                if (err) return reject(err);
                resolve(literals[0].toString());
            });
        });
    }

    public static importKey(key: string, password?: string): Promise<any> {
        return new Promise((resolve, reject) => {
            kbpgp.KeyManager.import_from_armored_pgp({
                armored: key
            }, (err, keyPair) => {
                if (err) return reject(err);

                if (keyPair.is_pgp_locked()) {
                    if (!password) return reject('Password is required for locked key');
                    keyPair.unlock_pgp({
                        passphrase: password
                    }, (err) => {
                        if (err) return reject(err);
                        resolve(keyPair);
                    });
                } else {
                    resolve(keyPair);
                }
            });
        });
    }

    public static exportPublicKey(keyPair: any): Promise<any> {
        return new Promise((resolve, reject) => {
            keyPair.export_pgp_public({}, (err, exportedPublicKey) => {
                if (err) return reject(err);
                resolve(exportedPublicKey);
            });
        });
    }

    public static exportPrivateKey(keyPair: any, password?: string): Promise<any> {
        return new Promise((resolve, reject) => {
            keyPair.export_pgp_private({
                passphrase: password
            }, (err, exportedPublicKey) => {
                if (err) return reject(err);
                resolve(exportedPublicKey);
            });
        });
    }

}
