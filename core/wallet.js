const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

class Wallet {
  constructor(privateKey = null) {
    if (privateKey) {
      this.key = ec.keyFromPrivate(privateKey, 'hex');
    } else {
      this.key = ec.genKeyPair();
    }
    
    this.publicKey = this.key.getPublic('hex');
    this.privateKey = this.key.getPrivate('hex');
  }

  sign(hash) {
    return this.key.sign(hash, 'base64').toDER('hex');
  }
}

module.exports = Wallet;
