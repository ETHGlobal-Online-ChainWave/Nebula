# NeBula Overview

We worked on a project using React and TypeScript for the frontend. 
- To quickly connect to the blockchain and ensure efficiency and security of the work, We utilized the Metamask SDK for connection.   
- We adopted the immutable function structure of Uniswap and calculated values such as "Strike" and "AmountIn" on the frontend.  
- In this case, We utilized Multicall extensively to obtain the balances of various ERC20 assets across multiple chains.
- To make our service user-friendly for those who are new to crypto, We designed it with a user-friendly interface.   
  - For example, even if there is only one token, users can still set a pair and have the opportunity to engage in future trading.  
- We simplified complex functions such as hedging amount and margin ratio for easy understanding.   
- We believe this will greatly contribute to the expansion of Web3 solutions.  

## Introducing Defutures
Revolutionize your Web3 investments with our 100% decentralized futures market on the Ethereum Virtual Machine (EVM). Defutures tackles the critical issue of position value drops in existing DeFi platforms, which result from the volatility of paired tokens. By offering the ability to open hedging future positions, Defutures provides a robust solution to this challenge.

## Tech Stack
- React.js
- Typescript
- TailwindCss
- ethers.js
- typechain
- recoil
- Multicall


## Start

Set you Cometh API KEY in the following env var:

```
export NEXT_PUBLIC_COMETH_API_KEY=YOUR_API_KEY
```

After the successfull installation of the packages: `yarn dev`
