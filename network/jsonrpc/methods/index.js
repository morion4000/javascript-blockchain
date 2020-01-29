const getblockhash = require('./getblockhash');

module.exports = function(blockchain) {
    return {
        getblockhash: getblockhash(blockchain)
    }
}