const SHA256 = require('crypto-js/sha256');

class POW {
    computeBlockHash(transactions, nonce, latestBlock) {
        const timestamp = Date.now();

        return SHA256((latestBlock.index + 1) + latestBlock.hash + timestamp +
            JSON.stringify(transactions) + nonce).toString();
    }

    hash(difficulty, transactions, latestBlock) {
        let nonce = 0;
        let hash;

        do {
            hash = this.computeBlockHash(transactions, nonce, latestBlock);
            nonce++;
        } while (hash.substring(0, difficulty) !== Array(difficulty + 1).join('0'));
        
        return [hash, nonce];
    }
}

module.exports = POW;