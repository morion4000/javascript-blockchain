class Block {
  constructor(index, timestamp, data, hash = '', previousHash = '') {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.hash = hash;
    this.previousHash = previousHash;
    this.nonce = 0;
  }
}

module.exports = Block;
