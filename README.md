![nebula](https://github.com/ETHGlobal-Online-ChainWave/Nebula/assets/59263564/0d16fbd6-351b-4f98-8144-02c1dc33b6a1)

# NeBula Overview
https://youtu.be/BiPv0tLxyPM?si=PbNzWvl_Dlev0l_w

We have developed a system that leverages NFC for wallet creation and login, as well as QR codes for transaction generation and approval. Both NFC tagging and QR codes offer convenient solutions for mobile users, and we've integrated these technologies into the blockchain.

The reason behind our creation of NFC card wallets stems from the shortcomings of existing wallet systems. Custodial wallets often suffer from the Trusted Entity problem, and Key Management Service (KMS) wallets share similar issues. Mobile wallets typically require app installation and setup, and hardware wallets can be expensive and have limited token support.

With our NFC card wallet system, anyone can create a wallet using their readily available NFC credit or debit cards. This system facilitates seamless offline payments using NFC cards, making in-store purchases and participation in offline events more straightforward.

Furthermore, when it comes to generating and approving transactions, we've streamlined the process by using QR codes, reducing the user's manual effort. This feature can prove to be highly valuable for real-world retail purchases, offline events, and various situations where QR codes are employed.

## Introducing Our Tech
The main points are NFC, QRCODE, Cometh SDK, Tableland, and EIP 681.
Cometh allows first time users to adapt web3 for easy wallet creation and processing processor with zero -gas -fee.
Create a wallet and log in by tagging NFC using NFC web api.
When creating a processor with a qr code, the corresponding qr image was saved in a decentralized database table to pull out the corresponding qr transaction.
Convenience has been increased by using EIP-681, which converts transaction requests into QR codes.

## Tech Stack
- Next.js
- Typescript
- TailwindCss
- ethers.js
- Nfc API
- Cometh
- Tableland


## Start

Set you Cometh API KEY in the following env var:

```
export NEXT_PUBLIC_COMETH_API_KEY=YOUR_API_KEY
```

After the successfull installation of the packages: `yarn dev`
