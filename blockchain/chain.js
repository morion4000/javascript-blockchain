const chalk = require('chalk');

let Block = require('./block');
let Transaction = require('./transaction');
let Difficulty = require('./difficulty');
let Reward = require('./reward');
const consts = require('../consts');
let POW = require('./../mining').POW;

class Chain {
  constructor(name) {
    this.name = name;
    this.transactions = [];
    this.blocks = [];
    this.height = 0;
    this.difficulty = Difficulty.latest;
    this.miningReward = Reward.latest;

    this.addGenesisBlock();

    console.log(chalk.blue('[BLOCKCHAIN]'), `init chain: ${this.name}, diff: ${this.difficulty}`);
  }

  addGenesisBlock() {
    this.height = 1;
    this.blocks.push(new Block(0, Date.now(), this.transactions, consts.GENESIS_BLOCK_HASH));
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

    console.log(chalk.blue('[BLOCKCHAIN]'), `block mined ${block.hash}`);
  }

  addTransaction(transaction) {
    if (transaction.isValid()) {
      this.transactions.push(transaction);
    }
  }

  isValid(height) {
    const l = height || this.height;

    for (var i = 1; i < l; i++) {
      const currentBlock = this.blocks[i];
      const previousBlock = this.blocks[i - 1];

      if (currentBlock.previousHash !== previousBlock.hash) {
        console.log(chalk.blue('[BLOCKCHAIN]'), `invalid block ${currentBlock.index}`);

        return false;
      }
    }

    return true;
  }

  mine(minerAddress) {
    const latestBlock = this.getLatestBlock();
    let newBlock = new Block(latestBlock.index + 1, Date.now(), null);

    this.transactions.push(new Transaction(null, minerAddress, this.miningReward));

    const [hash, nonce] = POW.hash(this.difficulty, this.transactions, latestBlock);
    
    newBlock.hash = hash;
    newBlock.nonce = nonce;
    newBlock.data = this.transactions;
    newBlock.coinbase = minerAddress;
    newBlock.miningReward = this.miningReward;
    newBlock.difficulty = this.difficulty;

    this.addBlock(newBlock);
  }
}

module.exports = Chain;
