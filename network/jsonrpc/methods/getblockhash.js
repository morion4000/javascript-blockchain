/*
    Method: getblockhash
    Alias: getblocknumber
    Parameters: (blockHeight)
    Description: Returns hash of block in best-block-chain at height.
    Returns: String
*/

module.exports = function(blockchain) {    
    return function(args, done) {
        console.log(`calling getblockhash with arg: ${args}`);

        let hash;

        if (args.length) {
            for (var i=0; i<blockchain.height; i++) {
                const block = blockchain.blocks[i];
    
                if (block.index === args[0]) {
                    hash = block.hash;
                    break;
                }
            }
        }

        done(null, hash);
    }
}