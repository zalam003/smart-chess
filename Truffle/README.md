# chess - Contract for SMART Chess

Deploy SMART Chess with name, symbol and decimals passed as constructor arguments. Implementation is upgradeable using Energi governance.

## Requirements

- nodejs v18.17.0
- yarn v1.22.+

## Local Development

1. Git clone repo with `git clone git@git.energi.software:energi/tech/defi/swap/assets.git`
2. Run `yarn` to install the necessary dependencies for the project.
3. Run `yarn lint` to lint all JS files with `prettier`
4. Run `yarn devchain` [Ganache CLI](https://github.com/trufflesuite/ganache-cli) in a separate console.
5. Run `yarn compile` to only compile the contracts in the local _contracts_ folder.
6. Run `yarn test` to compile and run all automated tests in the _test_ folder. Alternatively use `yarn testSafe`, if tests don't run all the way.
7. Run `truffle test test/${testfile} --compile-none` to run individual tests.

## Automated Migration

1. Make sure that steps 1. to 3. of `Local Development` were completed.
2. Run `yarn migchain` [Ganache CLI](https://github.com/trufflesuite/ganache-cli) in a separate console.
3. Run `yarn migrate` to deploy the contracts to the local _ganache_ blockchain, which will now run on port 7545.

## Deployment on public blockchains

### Energi Testnet

1. Create a local file in the root directory of this repository called `.secret` with your mnemonic.
2. Run `truffle console --network testnet` to open a console.
3. Run `deploy` in that console to deploy all smart contracts as desribed in _local development_.
4. Run `truffle run verify ChessERC20@0xB08F0ee6Bc6c29c4D3Feb74B2402295EfD2B49C9 --network testnet --forceConstructorArgs string:`
5. Run `truffle run verify ChessNFT@0x8dF24D7aeE61dC1C985597e68EC5b2700368Fd41 --network testnet --forceConstructorArgs string:`
6. Run `truffle run verify Elo@0xe5E5308919eFc0CCc2622671f31c83F22b11dC2A --network testnet --forceConstructorArgs string:`
7. Run `truffle run verify ChessGame@0xe0B82d38659EfC4da53E9772544660470DeB6ffC --network testnet --forceConstructorArgs string:`

### Energi Mainnet

1. Create a local file in the root directory of this repository called `.secret` with your mnemonic.
2. Run `truffle console --network mainnet` to open a console.
3. Run `deploy` in that console to deploy all smart contracts as desribed in _local development_.
4. Run `truffle run verify ChessERC20@ --network mainnet --forceConstructorArgs string:`
5. Run `truffle run verify ChessNFT@ --network mainnet --forceConstructorArgs string:`
6. Run `truffle run verify Elo@ --network mainnet --forceConstructorArgs string:`
7. Run `truffle run verify ChessGame@ --network mainnet --forceConstructorArgs string:`

### Additional

For other functionalities, see [docs](./docs).
