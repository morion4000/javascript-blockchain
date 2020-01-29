# JavaScript Blockchain

## Abstract
This is a naive implementation of a Blockchain. It is for learning purposes and it tries to simplify the complex technology stack and concepts of a real Blockchain. There are no optimisations or security practises implemented.

## TODO

- [x] simple transactions
- [x] static difficulty
- [x] static mining rewards
- [x] basic wallet
- [ ] persistent storage (sqlite, file)
- [ ] communication protocol (sockets, ~~JSON-RPC~~, REST)
- [ ] P2P network (libp2p)
- [ ] consensus protocol (longest chain, BFT)
- [ ] validations (transactions, blocks)
- [x] CLI tools (wallet, miner, node)
- [ ] consensus algorithms (~~POW~~, POS, DPOS)
- [ ] mining pool (Stratum, Getwork, Getblocktemplate)
- [ ] payment mechanisms (PPS, PPLNS)
- [ ] Merkle tree for transactions
- [ ] SPV
- [ ] complex transactions (script)
- [ ] dynamic difficulty
- [ ] dynamic mining rewards (halving)
- [ ] transactions anti-spam mechanism
- [ ] encoding
- [ ] smart contracts

## References

* http://www.righto.com/2014/02/bitcoin-mining-hard-way-algorithms.html
* https://medium.com/@preethikasireddy/how-does-ethereum-work-anyway-22d1df506369
* https://hackernoon.com/learn-blockchains-by-building-one-117428612f46
* https://www.youtube.com/watch?v=zVqczFZr124
* https://github.com/bitcoinbook/bitcoinbook
* https://github.com/ethereumbook/ethereumbook

## Specifications

* https://www.blockchain.com/api/json_rpc_api

## Commands

### Run a node
`npm start`

### Run a solo miner
`npm run miner`

### Run the wallet utility
`npm run wallet`


## Installation
`npm install`
