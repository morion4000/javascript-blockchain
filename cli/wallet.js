const fs = require('fs');
let Wallet = require('../core/wallet');

let wallet = new Wallet();

const fileContents = {
    public: wallet.publicKey,
    private: wallet.privateKey
};
const fileName = `${wallet.publicKey}.json`;

console.dir(fileContents);

fs.writeFileSync(fileName, JSON.stringify(fileContents));

console.log(`saved to: ${fileName}`);