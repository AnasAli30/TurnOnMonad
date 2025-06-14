# turnonmonad

A Farcaster Mini App built on the Monad testnet, featuring real-time wagered multiplayer chess.

## Description

**turnonmonad** is a decentralized chess platform where players can create or join rooms, place bets, and compete in live chess matches. The app leverages Monad smart contracts for secure, on-chain wager management and integrates with Farcaster for seamless social sharing. Designed for both desktop and mobile, it delivers a fast, interactive, and social chess experience.

## Features

- ♟️ **Real-time Multiplayer Chess**: Play live chess games with friends or other users.
- 💸 **Wager/Pool System**: Place bets on games, with all wagers managed by a Monad smart contract.
- 🔗 **Monad Testnet Integration**: All game pools and payouts are handled on-chain for transparency and security.
- 👛 **Wallet Connection**: Connect your wallet to join or create games and manage funds.
- 🏆 **On-chain Payouts**: Winners can claim their earnings directly from the smart contract.
- 🏠 **Room System**: Create or join unique game rooms using a simple code.
- 📱 **Mobile-friendly UI**: Responsive design for smooth play on any device.
- 📢 **Farcaster Social Sharing**: Winners can automatically cast their victory to Farcaster.
- 🛠️ **Dev/Test Tools**: Includes instant win buttons and test flows for rapid development.

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn
- Wallet supporting Monad testnet

### Installation

```bash
git clone https://github.com/AnasAli30/TurnOnMonad
cd TurnOnMonad
npm install # or yarn install
```

### Running Locally

```bash
npm run dev # or yarn dev
```

- The app runs at [http://localhost:3000](http://localhost:3000)
- The backend/socket server runs at [http://localhost:3001](http://localhost:3001)

### Environment
- Configure your Monad testnet RPC and contract addresses in `.env` or config files as needed.

## Usage

1. **Connect your wallet** (Monad testnet).
2. **Create a new game** or **join an existing room** using a room code.
3. **Place your bet** and wait for an opponent.
4. **Play chess in real time**—winner claims the on-chain pool.
5. **Share your win** on Farcaster with a single click!

## Tech Stack
- React, Next.js
- Socket.io (real-time)
- wagmi/viem (wallet & contract)
- Monad testnet (smart contracts)
- Farcaster SDK (social sharing)
- Tailwind CSS (UI)

## License

MIT
