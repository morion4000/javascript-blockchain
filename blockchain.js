const SHA256 = require('crypto-js/sha256');

let Block = require('./block');
let Transaction = require('./transaction');

class Blockchain {
  constructor(name) {
    console.log(`init blockchain, ${name}`);

    this.name = name;
    this.transactions = [];
    this.blocks = [];
    this.height = 0;
    this.difficulty = 4;
    this.miningReward = 10;
  }

  addGenesisBlock() {
    this.height = 1;

    this.blocks.push(new Block(0, '01/01/20', this.transactions));
  }

  getLatestBlock() {
    return this.blocks[this.blocks.length - 1];
  }

  getBalanceOfAddress(address) {
    let balance = 0;

    for (var i = 0; i < this.height; i++) {
      let transactions = this.blocks[i].data;

      for (var j = 0; j < transactions.length; j++) {
        let transaction = transactions[j];

        if (transaction.to === address) {
          balance += transaction.amount;
        }

        if (transaction.from === address) {
          balance -= transaction.amount;
        }
      }
    }

    return balance;
  }

  addBlock(block) {
    block.previousHash = this.getLatestBlock().hash;

    this.height++;
    this.transactions = [];

    this.blocks.push(block);
  }

  addTransaction(transaction) {
    if (transaction.isValid()) {
      this.transactions.push(transaction);  
    }
  }

  computeHash(data, nonce) {
    const latestBlock = this.getLatestBlock();
    const timestamp = '01/02/21';

    return SHA256((latestBlock.index + 1) + latestBlock.hash + timestamp +
      JSON.stringify(data) + nonce).toString();
  }

  isValid(height) {
    const l = height || this.height;

    for (var i = 1; i < l; i++) {
      const currentBlock = this.blocks[i];
      const previousBlock = this.blocks[i - 1];

      if (currentBlock.previousHash !== previousBlock.hash) {
        console.log(`invalid block ${currentBlock.index}`);

        return false;
      }
    }

    return true;
  }

  mine(minerAddress) {
    const index = this.getLatestBlock().index + 1;
    let newBlock = new Block(index, '01/02/21', null);
    let hash;

    do {
      hash = this.computeHash(this.transactions, newBlock.nonce);
      newBlock.nonce++;
    } while (hash.substring(0, this.difficulty) !==
      Array(this.difficulty + 1).join('0'));

    this.transactions.push(new Transaction(null, minerAddress, this.miningReward));

    newBlock.hash = hash;
    newBlock.data = this.transactions;

    this.addBlock(newBlock);
  }
}

module.exports = Blockchain;
