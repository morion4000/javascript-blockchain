class Block {
  constructor(index, timestamp, data, hash = '', previousHash = '', coinbase = '', miningReward = 0) {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.hash = hash;
    this.previousHash = previousHash;
    this.nonce = 0;
    this.coinbase = coinbase;
    this.miningReward = miningReward;
  }
}

module.exports = Block;
