module.exports = {
    VERSION: 0,
    MINING_REWARD: 10,
    GENESIS_BLOCK_HASH: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    DIFFICULTY: 4,
    NETWORK: {
        JSONRPC: {
            SERVER_PORT: 8545
        },
        SOCKETS: {
            SERVER_PORT: 4000,
            PING_INTERVAL: 5000 // miliseconds
        },
        FALLBACKS: [
            ['http', 'localhost', 4000],
            ['http', 'localhost', 4001]
        ]
    }
};