# ⚡️ Next.js Web3 Starter

A modern, production-ready Web3 application built with **Next.js 15**, integrating **MetaMask** and **WalletConnect** for seamless Ethereum interactions. Includes token balance checks, token transfers, testing, and responsive UI.

---

## 🚀 Features

- ⚙️ **Next.js 15 (App Router)**
- 🔐 **Wallet Integration**: MetaMask & WalletConnect
- 💸 **ERC-20 Token Support**: Balance checks & token transfers
- 🧑‍🎨 **Tailwind CSS** for responsive design
- ✍️ **TypeScript** for robust type safety
- 🧪 **Jest + Playwright** for unit and E2E testing
- 🧠 **React Hooks** for Web3 state management
- 📱 **Mobile Friendly** UI & UX

---

## 📦 Tech Stack

| Layer       | Technology                         |
|-------------|-------------------------------------|
| Framework   | [Next.js 15](https://nextjs.org/)   |
| Blockchain  | [ethers.js](https://docs.ethers.org/) |
| Wallets     | MetaMask, WalletConnect             |
| Styling     | Tailwind CSS                        |
| State Mgmt  | React Hooks                         |
| Testing     | Jest, Playwright                    |
| Language    | TypeScript                          |

---

## 🧱 Project Structure

```
src/
├── app/                 # App Router pages
│   ├── balance/         # Token balance checker
│   ├── transfer/        # Token transfer page
│   ├── globals.css      # Global styles
│   ├── layout.tsx       # Global layout wrapper
│   └── page.tsx         # Landing page
├── components/          # UI components
│   └── WalletConnector.tsx
├── hooks/               # Custom hooks
│   └── useERC20.ts
├── lib/                 # Utility functions
│   └── utils.ts
├── providers/           # Web3 context provider
│   └── Web3Provider.tsx
└── __tests__/           # Unit and e2e tests
```

---

## ⚙️ Getting Started

### ✅ Prerequisites

- Node.js `v18+`
- Package manager: `npm`, `yarn`, or `pnpm`
- MetaMask installed
- WalletConnect project ID

### 📥 Installation

```bash
git clone https://github.com/<your-username>/nextjs-web3-starter.git
cd nextjs-web3-starter
npm install
```

### 🔐 Environment Variables

Create `.env.local` from example:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your WalletConnect ID:

```env
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id_here
```

You can obtain one from [WalletConnect Cloud](https://cloud.walletconnect.com/).

---

## 🖥️ Run the App

```bash
npm run dev
# or yarn dev / pnpm dev
```

Visit: [http://localhost:3000](http://localhost:3000)

---

## 🔍 Usage Guide

### 🔗 Connect Wallet

1. Open homepage
2. Click **MetaMask** or **WalletConnect**
3. Follow prompt to connect
4. Wallet address & ETH balance will appear

### 📊 Check Token Balances

1. Go to `/balance`
2. Enter any **ERC20** token contract address
3. Click **Check Balance**
4. Or select a token from the popular list

### 💸 Transfer Tokens

1. Go to `/transfer`
2. Fill in:
   - ERC20 token contract
   - Receiver address
   - Amount
3. Confirm transfer in wallet popup

---

## ✅ Scripts

| Script              | Description                     |
|---------------------|---------------------------------|
| `npm run dev`       | Start development server        |
| `npm run build`     | Build app for production        |
| `npm run start`     | Start production server         |
| `npm run lint`      | Run ESLint                      |
| `npm run type-check`| TypeScript checks               |
| `npm run test`      | Run unit tests (Jest)           |
| `npm run test:e2e`  | Run E2E tests (Playwright)      |
| `npm run test:e2e:ui`| E2E tests with browser UI       |

---

## 🧪 Testing

### 🔬 Unit Tests

```bash
npm run test
```

### 🧪 End-to-End (Playwright)

```bash
npm run test:e2e
```

With browser UI:

```bash
npm run test:e2e:ui
```

---

## 🛠 Configuration

### 🌐 Supported Networks

The app is currently configured for **Ethereum Mainnet**. You can customize network settings in:

```ts
src/providers/Web3Provider.tsx
```

### 💎 Custom Tokens

Add ERC20 tokens to the `popularTokens` array in:

```ts
src/app/balance/page.tsx
```

---

## 🔐 Security Notes

- ❌ Never commit private keys or secrets
- ✅ Validate all contract addresses
- 🚫 Do not use real funds in development
- 🧪 Always test on testnets first

---

## 🤝 Contributing

1. Fork this repo
2. Create your branch (`git checkout -b feature/foo`)
3. Commit & push (`git commit -m 'Add foo'`)
4. Submit PR

---

## 📄 License

This project is licensed under the [MIT License](./LICENSE).

---

## 🙋‍♂️ Support

Found a bug or need help?  
Open an [issue](https://github.com/<your-username>/nextjs-web3-starter/issues).

---

**Happy building! 🔧**
