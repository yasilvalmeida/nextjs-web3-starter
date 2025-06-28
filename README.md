# Next.js Web3 Starter

A modern Web3 application built with Next.js 15, featuring MetaMask and WalletConnect integration for Ethereum blockchain interactions.

## Features

- 🚀 **Next.js 15** with App Router
- 🔗 **Web3 Integration** with MetaMask and WalletConnect
- 💰 **ERC20 Token Operations** - Check balances and transfer tokens
- 🎨 **Modern UI** with Tailwind CSS
- 📝 **TypeScript** for type safety
- 🧪 **Testing Setup** with Jest and Playwright
- 🔥 **React Hooks** for wallet state management
- 📱 **Responsive Design** for mobile and desktop

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm, yarn, or pnpm
- MetaMask browser extension (for testing)

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd nextjs-web3-starter
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Set up environment variables:

```bash
cp .env.example .env.local
```

Edit `.env.local` and set your WalletConnect project ID:

```
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id_here
```

You can get a free project ID from [WalletConnect Cloud](https://cloud.walletconnect.com/).

4. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                 # Next.js 15 App Router
│   ├── balance/        # Token balance checking page
│   ├── transfer/       # Token transfer page
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Home page
├── components/         # React components
│   └── WalletConnector.tsx
├── hooks/              # Custom React hooks
│   └── useERC20.ts     # ERC20 token interactions
├── lib/                # Utility functions
│   └── utils.ts
├── providers/          # React context providers
│   └── Web3Provider.tsx
└── __tests__/          # Unit tests
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking
- `npm run test` - Run unit tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:e2e` - Run end-to-end tests
- `npm run test:e2e:ui` - Run e2e tests with UI

## Usage

### Connecting a Wallet

1. Click on either "MetaMask" or "WalletConnect" button on the homepage
2. Follow the prompts to connect your wallet
3. Once connected, you'll see your address and ETH balance

### Checking Token Balances

1. Navigate to the "Check Token Balance" page
2. Enter an ERC20 token contract address
3. Click "Check Balance" to see your token balance
4. Use the popular tokens section for quick access to common tokens

### Transferring Tokens

1. Navigate to the "Send Tokens" page
2. Enter the token contract address or come from the balance page
3. Enter the recipient address and amount
4. Click "Transfer" and confirm the transaction in your wallet

## Testing

### Unit Tests

Run unit tests with Jest:

```bash
npm run test
```

### End-to-End Tests

Run e2e tests with Playwright:

```bash
npm run test:e2e
```

To run tests with UI:

```bash
npm run test:e2e:ui
```

## Configuration

### Supported Networks

By default, the application is configured for Ethereum Mainnet. You can modify the network configuration in `src/providers/Web3Provider.tsx`.

### Adding Custom Tokens

You can add popular tokens to the balance page by modifying the `popularTokens` array in `src/app/balance/page.tsx`.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Run the test suite
6. Submit a pull request

## License

This project is licensed under the MIT License.

## Security Notes

- Never commit private keys or sensitive information
- Always verify contract addresses before interacting with tokens
- Test on testnets before using on mainnet
- Be cautious with transaction amounts

## Support

If you encounter any issues or have questions, please open an issue on the repository.
