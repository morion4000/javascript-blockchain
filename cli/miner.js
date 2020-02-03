let Chain = require('../blockchain/chain');
let Transaction = require('../blockchain/transaction');
let Wallet = require('../core/wallet');

let blockchain = new Chain('TEST');

let wallet1 = new Wallet();
let wallet2 = new Wallet();

console.log(`started with wallet: ${wallet1.publicKey}`);

while (1) {
  // Test transactions
  let transaction = new Transaction(wallet1.publicKey, wallet2.publicKey, 5);
  transaction.signature = wallet1.sign(transaction.calculateHash());

  blockchain.addTransaction(transaction);

  blockchain.mine(wallet1.publicKey);
}
