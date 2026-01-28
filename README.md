# Next.js Web3 Starter Kit

A production-ready foundation for building Ethereum dApps with Next.js 15. Features seamless wallet integration (MetaMask & WalletConnect), ERC-20 token operations, and comprehensive testing infrastructure. Designed for developers building DeFi applications, NFT platforms, or any Web3 product.

---

## 1. Project Overview

### The Problem

Building Web3 applications from scratch involves:
- Complex wallet connection logic across multiple providers
- Boilerplate code for common blockchain interactions
- Security considerations for handling user funds
- Testing challenges unique to blockchain development
- Keeping up with rapidly evolving Web3 libraries

### The Solution

This starter kit provides a battle-tested foundation with wallet connections, token operations, and testing already implemented. Start building your dApp's unique features immediately instead of reinventing common Web3 patterns.

### Why It Matters

- **Faster time-to-market**: Skip weeks of boilerplate setup
- **Production patterns**: Learn from established Web3 best practices
- **Security-first**: Proper handling of sensitive operations
- **Testing included**: Jest + Playwright tests ready to extend
- **Modern stack**: Next.js 15 App Router with TypeScript

---

## 2. Real-World Use Cases

| Application | How This Starter Helps |
|-------------|------------------------|
| **DeFi Dashboard** | Wallet connection and token balance display ready |
| **NFT Marketplace** | Extend with NFT contract interactions |
| **Token Launchpad** | Add token sale logic on top of transfer functionality |
| **DAO Governance** | Base for voting and proposal interfaces |
| **Portfolio Tracker** | Multi-token balance checking built-in |
| **Payment Gateway** | Token transfer UI as foundation |

---

## 3. Core Features

| Feature | Business Value |
|---------|----------------|
| **Multi-Wallet Support** | MetaMask and WalletConnect integration for broad user reach |
| **ERC-20 Operations** | Token balance checks and transfers out of the box |
| **Type-Safe Development** | Full TypeScript implementation reduces bugs |
| **Responsive Design** | Mobile-friendly UI with Tailwind CSS |
| **Testing Infrastructure** | Jest unit tests and Playwright E2E tests |
| **Modern Architecture** | Next.js 15 App Router with React hooks patterns |
| **Security Patterns** | Input validation and safe transaction handling |

---

## 4. High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Next.js Application                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐       │
│  │   Pages      │    │  Components  │    │   Hooks      │       │
│  │              │    │              │    │              │       │
│  │ • Home       │    │ • Wallet     │    │ • useERC20   │       │
│  │ • Balance    │    │   Connector  │    │ • useWallet  │       │
│  │ • Transfer   │    │ • Token UI   │    │              │       │
│  └──────────────┘    └──────────────┘    └──────────────┘       │
│           │                   │                   │              │
│           └───────────────────┼───────────────────┘              │
│                               │                                  │
│                    ┌──────────▼──────────┐                       │
│                    │   Web3 Provider     │                       │
│                    │   (ethers.js)       │                       │
│                    └──────────┬──────────┘                       │
│                               │                                  │
└───────────────────────────────┼──────────────────────────────────┘
                                │
           ┌────────────────────┼────────────────────┐
           │                    │                    │
    ┌──────▼──────┐     ┌───────▼───────┐   ┌───────▼───────┐
    │  MetaMask   │     │ WalletConnect │   │  Ethereum     │
    │  Extension  │     │   Protocol    │   │  Network      │
    └─────────────┘     └───────────────┘   └───────────────┘
```

---

## 5. Tech Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Framework** | Next.js 15 (App Router) | Server/client rendering, routing |
| **Language** | TypeScript | Type safety and developer experience |
| **Blockchain** | ethers.js | Ethereum interactions |
| **Wallets** | MetaMask, WalletConnect | User authentication |
| **Styling** | Tailwind CSS | Responsive, utility-first design |
| **State** | React Hooks | Web3 state management |
| **Testing** | Jest, Playwright | Unit and E2E testing |

---

## 6. How the System Works

### Wallet Connection Flow

```
User Clicks Connect → Provider Detection → Wallet Popup → Account Access → State Update
```

1. **Detection**: Check for MetaMask or trigger WalletConnect modal
2. **Request**: Call `eth_requestAccounts` for user approval
3. **Connect**: Receive wallet address and chain ID
4. **State**: Update React context with connection status
5. **Persist**: Remember connection preference for return visits

### Token Balance Check

```
Select Token → Input Contract Address → Query Blockchain → Display Balance
```

1. **Input**: User provides ERC-20 token contract address
2. **Validate**: Verify address format and contract existence
3. **Query**: Call `balanceOf()` on token contract
4. **Format**: Convert from wei with proper decimals
5. **Display**: Show human-readable balance

### Token Transfer Flow

```
Enter Details → Validate → Sign Transaction → Broadcast → Confirm
```

1. **Input**: Recipient address, amount, and token selection
2. **Estimate**: Calculate gas fees for user approval
3. **Sign**: User approves transaction in wallet
4. **Broadcast**: Submit to Ethereum network
5. **Track**: Monitor transaction until confirmation

---

## 7. Setup & Run

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm
- MetaMask browser extension
- WalletConnect Project ID (free from [WalletConnect Cloud](https://cloud.walletconnect.com/))

### Quick Start

```bash
# Clone repository
git clone https://github.com/your-org/nextjs-web3-starter.git
cd nextjs-web3-starter

# Install dependencies
npm install

# Configure environment
cp .env.example .env.local

# Add your WalletConnect ID to .env.local:
# NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id_here

# Start development server
npm run dev
```

### Access Points

| Page | URL | Description |
|------|-----|-------------|
| **Home** | http://localhost:3000 | Wallet connection |
| **Balance** | http://localhost:3000/balance | Token balance checker |
| **Transfer** | http://localhost:3000/transfer | Token transfer interface |

---

## 8. API & Usage

### Wallet Connection

```tsx
import { useWeb3 } from '@/providers/Web3Provider';

function MyComponent() {
  const { address, isConnected, connect, disconnect } = useWeb3();

  return (
    <button onClick={connect}>
      {isConnected ? `Connected: ${address}` : 'Connect Wallet'}
    </button>
  );
}
```

### Token Balance Check

```tsx
import { useERC20 } from '@/hooks/useERC20';

function BalanceChecker() {
  const { getBalance, balance, loading } = useERC20();

  const checkBalance = async () => {
    await getBalance('0x...tokenAddress');
  };

  return (
    <div>
      <button onClick={checkBalance}>Check Balance</button>
      {balance && <p>Balance: {balance}</p>}
    </div>
  );
}
```

### Token Transfer

```tsx
import { useERC20 } from '@/hooks/useERC20';

function TransferForm() {
  const { transfer, loading } = useERC20();

  const handleTransfer = async () => {
    await transfer({
      tokenAddress: '0x...token',
      recipient: '0x...recipient',
      amount: '1.0'
    });
  };

  return (
    <button onClick={handleTransfer} disabled={loading}>
      Transfer Tokens
    </button>
  );
}
```

---

## 9. Scalability & Production Readiness

### Current Architecture Strengths

| Aspect | Implementation |
|--------|----------------|
| **Code Splitting** | Next.js automatic code splitting per page |
| **Type Safety** | Full TypeScript prevents runtime errors |
| **Testing** | Jest and Playwright tests provide confidence |
| **Mobile Support** | Responsive design and WalletConnect for mobile |
| **Security** | Input validation and safe transaction patterns |

### Production Enhancements (Recommended)

| Enhancement | Purpose |
|-------------|---------|
| **Multi-Chain Support** | Add Polygon, Arbitrum, Base networks |
| **Transaction History** | Store and display past transactions |
| **Price Feeds** | Integrate Chainlink or CoinGecko for USD values |
| **Error Tracking** | Add Sentry for production monitoring |
| **Analytics** | Track wallet connections and feature usage |
| **ENS Resolution** | Support human-readable addresses |

### Network Configuration

Currently configured for Ethereum Mainnet. Customize networks in:

```typescript
// src/providers/Web3Provider.tsx
const supportedChains = [mainnet, polygon, arbitrum];
```

---

## 10. Scripts & Testing

### Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run type-check` | TypeScript validation |
| `npm run test` | Run unit tests (Jest) |
| `npm run test:e2e` | Run E2E tests (Playwright) |
| `npm run test:e2e:ui` | E2E tests with browser UI |

### Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# E2E with visual debugging
npm run test:e2e:ui
```

---

## Project Structure

```
nextjs-web3-starter/
├── src/
│   ├── app/                 # App Router pages
│   │   ├── balance/         # Token balance checker
│   │   ├── transfer/        # Token transfer page
│   │   ├── layout.tsx       # Global layout
│   │   └── page.tsx         # Landing page
│   ├── components/          # UI components
│   │   └── WalletConnector.tsx
│   ├── hooks/               # Custom hooks
│   │   └── useERC20.ts
│   ├── lib/                 # Utilities
│   │   └── utils.ts
│   ├── providers/           # Context providers
│   │   └── Web3Provider.tsx
│   └── __tests__/           # Test files
├── playwright.config.ts     # E2E test config
├── jest.config.js           # Unit test config
└── package.json
```

---

## Security Considerations

- Never commit private keys or secrets
- Validate all contract addresses before interaction
- Use testnets (Sepolia, Goerli) for development
- Test with small amounts before production
- Implement proper error handling for failed transactions

---

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## License

MIT License - see [LICENSE](LICENSE) for details.

---

*Your foundation for building the next generation of Web3 applications.*
