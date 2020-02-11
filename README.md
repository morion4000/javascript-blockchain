# JavaScript Blockchain

## Abstract
This is a naive implementation of a Blockchain. It is for learning purposes and it tries to simplify the complex technology stack and concepts of a real Blockchain. There are no optimisations or security practises implemented.

![](https://user-images.githubusercontent.com/585066/74216457-3a562a00-4cad-11ea-8e21-d1b32cb25c2b.png)

## Functionality

- [x] simple transactions (UTXO)
- [x] static difficulty
- [x] static mining rewards
- [x] basic wallet (secp256k1)
- [ ] transaction fee
- [ ] block size limit
- [ ] miner configurations (min transaction fee)
- [ ] persistent storage (sqlite, ~~file~~)
- [x] communication protocol (sockets, JSON-RPC, ~~REST~~)
- [x] P2P network (socket.io, ~~libp2p~~)
- [ ] transaction broadcasting
- [ ] consensus protocol (longest chain, ~~BFT~~)
- [ ] validations (transactions, blocks)
- [x] CLI tools (wallet, miner, node)
- [x] consensus algorithms (POW (SHA256), ~~POS~~, ~~DPOS~~)
- [ ] mining pool (Stratum, Getwork, Getblocktemplate)
- [ ] payment mechanisms (PPS, PPLNS)
- [ ] Merkle tree for transactions
- [ ] SPV
- [ ] complex transactions (script)
- [ ] dynamic difficulty
- [ ] dynamic mining rewards (halving)
- [ ] transactions anti-spam mechanism
- [ ] serialization
- [ ] smart contracts
- [ ] calculate hashrate

## References

* http://www.righto.com/2014/02/bitcoin-mining-hard-way-algorithms.html
* https://medium.com/@preethikasireddy/how-does-ethereum-work-anyway-22d1df506369
* https://hackernoon.com/learn-blockchains-by-building-one-117428612f46
* https://www.youtube.com/watch?v=zVqczFZr124
* https://github.com/bitcoinbook/bitcoinbook
* https://github.com/ethereumbook/ethereumbook

## Specifications

* https://www.blockchain.com/api/json_rpc_api
* https://ethereum.gitbooks.io/frontier-guide/devp2p.html
* https://github.com/ethereum/wiki/wiki/json-rpc

## Commands

### Run a node
`npm start -- --port 4000 --rpc --rpcport 3000`

### Run a solo miner
`npm run miner`

### Run the wallet utility
`npm run wallet`


## Installation
`npm install`
