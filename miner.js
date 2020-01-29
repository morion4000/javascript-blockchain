let Chain = require('./blockchain/chain');
let Transaction = require('./blockchain/transaction');
let Wallet = require('./core/wallet');

let blockchain = new Chain('TEST');
let wallet1 = new Wallet();
let wallet2 = new Wallet();
let args = process.argv.slice(2);

console.log(`wallet ${wallet1.publicKey}`);

if (args.length > 0 && args[0] === '-m') {
  while (1) {
    let transaction = new Transaction(wallet1.publicKey, wallet2.publicKey, 5);
    transaction.signature = wallet1.sign(transaction.calculateHash());

    blockchain.addTransaction(transaction);

    blockchain.mine(wallet1.publicKey);

    console.log(blockchain.getBalanceOfAddress(wallet1.publicKey));
    console.log(blockchain.isValid());
    console.dir(blockchain.blocks);
  }
}
