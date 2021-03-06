import * as bip32 from 'bip32';
import * as bip39 from 'bip39';
import * as crypto from 'crypto-js';

describe('xrpl', () => {
  it('private key', async () => {
    // input Mnemonic
    const mnemonic = '';
    const seed = await bip39.mnemonicToSeed(mnemonic);
    const node = bip32.fromSeed(seed);
    // eslint-disable-next-line quotes
    const child = node.derivePath("44'/144'/0'/0/0");
    const privKeyString = child.privateKey?.toString('hex');
    console.log('privKey', privKeyString);
    if (privKeyString) {
      // input XRP_seed
      const encrypted = crypto.AES.encrypt('', privKeyString);
      console.log('encrypted', encrypted.toString());
      const decrypted = crypto.AES.decrypt(encrypted.toString(), privKeyString);
      console.log('decrypted', decrypted.toString(crypto.enc.Utf8));
    }

    expect(false).toBeFalsy();
  });
});
