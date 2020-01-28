let Blockchain = require('./blockchain');
let Transaction = require('./transaction');
let Wallet = require('./wallet');

let blockchain = new Blockchain('ION');
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
