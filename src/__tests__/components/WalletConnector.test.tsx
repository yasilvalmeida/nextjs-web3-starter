import { render, screen, fireEvent } from '@testing-library/react';
import { WalletConnector } from '../../components/WalletConnector';

// Mock the entire Web3Provider module
jest.mock('../../providers/Web3Provider', () => ({
  useWeb3: jest.fn(),
}));

const { useWeb3 } = require('../../providers/Web3Provider');
const mockUseWeb3 = useWeb3 as jest.MockedFunction<typeof useWeb3>;

describe('WalletConnector', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render connect wallet options when not connected', () => {
    mockUseWeb3.mockReturnValue({
      state: {
        isConnected: false,
        address: null,
        balance: null,
        provider: null,
        signer: null,
        chainId: null,
        isConnecting: false,
        walletType: null,
      },
      connectMetaMask: jest.fn(),
      connectWalletConnect: jest.fn(),
      disconnect: jest.fn(),
      getBalance: jest.fn(),
    });

    render(<WalletConnector />);

    expect(screen.getByText('Connect Wallet')).toBeInTheDocument();
    expect(screen.getByText('MetaMask')).toBeInTheDocument();
    expect(screen.getByText('WalletConnect')).toBeInTheDocument();
  });

  it('should render connected state when wallet is connected', () => {
    mockUseWeb3.mockReturnValue({
      state: {
        isConnected: true,
        address: '0x1234567890123456789012345678901234567890',
        balance: '1.5',
        provider: null,
        signer: null,
        chainId: 1,
        isConnecting: false,
        walletType: 'metamask',
      },
      connectMetaMask: jest.fn(),
      connectWalletConnect: jest.fn(),
      disconnect: jest.fn(),
      getBalance: jest.fn(),
    });

    render(<WalletConnector />);

    expect(screen.getByText('Connected with metamask')).toBeInTheDocument();
    expect(screen.getByText('0x1234...7890')).toBeInTheDocument();
    expect(screen.getByText('Balance: 1.5000 ETH')).toBeInTheDocument();
    expect(screen.getByText('Disconnect')).toBeInTheDocument();
  });

  it('should call connectMetaMask when MetaMask button is clicked', () => {
    const mockConnectMetaMask = jest.fn();

    mockUseWeb3.mockReturnValue({
      state: {
        isConnected: false,
        address: null,
        balance: null,
        provider: null,
        signer: null,
        chainId: null,
        isConnecting: false,
        walletType: null,
      },
      connectMetaMask: mockConnectMetaMask,
      connectWalletConnect: jest.fn(),
      disconnect: jest.fn(),
      getBalance: jest.fn(),
    });

    render(<WalletConnector />);

    fireEvent.click(screen.getByText('MetaMask'));
    expect(mockConnectMetaMask).toHaveBeenCalledTimes(1);
  });

  it('should show connecting state', () => {
    mockUseWeb3.mockReturnValue({
      state: {
        isConnected: false,
        address: null,
        balance: null,
        provider: null,
        signer: null,
        chainId: null,
        isConnecting: true,
        walletType: null,
      },
      connectMetaMask: jest.fn(),
      connectWalletConnect: jest.fn(),
      disconnect: jest.fn(),
      getBalance: jest.fn(),
    });

    render(<WalletConnector />);

    expect(screen.getAllByText('Connecting...')).toHaveLength(2);
  });
});
