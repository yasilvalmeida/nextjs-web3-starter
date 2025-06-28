'use client';

import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
} from 'react';
import { ethers } from 'ethers';
import { EthereumProvider } from '@walletconnect/ethereum-provider';
import toast from 'react-hot-toast';

export interface WalletState {
  isConnected: boolean;
  address: string | null;
  balance: string | null;
  provider: ethers.BrowserProvider | null;
  signer: ethers.JsonRpcSigner | null;
  chainId: number | null;
  isConnecting: boolean;
  walletType: 'metamask' | 'walletconnect' | null;
}

type WalletAction =
  | { type: 'SET_CONNECTING'; payload: boolean }
  | {
      type: 'SET_CONNECTED';
      payload: {
        address: string;
        provider: ethers.BrowserProvider;
        signer: ethers.JsonRpcSigner;
        chainId: number;
        walletType: 'metamask' | 'walletconnect';
      };
    }
  | { type: 'SET_BALANCE'; payload: string }
  | { type: 'DISCONNECT' };

const initialState: WalletState = {
  isConnected: false,
  address: null,
  balance: null,
  provider: null,
  signer: null,
  chainId: null,
  isConnecting: false,
  walletType: null,
};

function walletReducer(state: WalletState, action: WalletAction): WalletState {
  switch (action.type) {
    case 'SET_CONNECTING':
      return { ...state, isConnecting: action.payload };
    case 'SET_CONNECTED':
      return {
        ...state,
        isConnected: true,
        address: action.payload.address,
        provider: action.payload.provider,
        signer: action.payload.signer,
        chainId: action.payload.chainId,
        walletType: action.payload.walletType,
        isConnecting: false,
      };
    case 'SET_BALANCE':
      return { ...state, balance: action.payload };
    case 'DISCONNECT':
      return initialState;
    default:
      return state;
  }
}

interface Web3ContextType {
  state: WalletState;
  connectMetaMask: () => Promise<void>;
  connectWalletConnect: () => Promise<void>;
  disconnect: () => void;
  getBalance: () => Promise<void>;
}

const Web3Context = createContext<Web3ContextType | undefined>(undefined);

export function useWeb3() {
  const context = useContext(Web3Context);
  if (context === undefined) {
    throw new Error('useWeb3 must be used within a Web3Provider');
  }
  return context;
}

interface Web3ProviderProps {
  children: ReactNode;
}

export function Web3Provider({ children }: Web3ProviderProps) {
  const [state, dispatch] = useReducer(walletReducer, initialState);

  const connectMetaMask = async () => {
    try {
      dispatch({ type: 'SET_CONNECTING', payload: true });

      if (typeof window.ethereum === 'undefined') {
        toast.error('MetaMask is not installed');
        return;
      }

      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      if (accounts.length === 0) {
        toast.error('No accounts found');
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const network = await provider.getNetwork();

      dispatch({
        type: 'SET_CONNECTED',
        payload: {
          address: accounts[0],
          provider,
          signer,
          chainId: Number(network.chainId),
          walletType: 'metamask',
        },
      });

      toast.success('MetaMask connected successfully');
    } catch (error) {
      console.error('Error connecting to MetaMask:', error);
      toast.error('Failed to connect to MetaMask');
      dispatch({ type: 'SET_CONNECTING', payload: false });
    }
  };

  const connectWalletConnect = async () => {
    try {
      dispatch({ type: 'SET_CONNECTING', payload: true });

      const ethereumProvider = await EthereumProvider.init({
        chains: [1], // Ethereum Mainnet
        projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'demo',
        showQrModal: true,
      });

      await ethereumProvider.enable();

      const provider = new ethers.BrowserProvider(ethereumProvider);
      const signer = await provider.getSigner();
      const network = await provider.getNetwork();
      const address = await signer.getAddress();

      dispatch({
        type: 'SET_CONNECTED',
        payload: {
          address,
          provider,
          signer,
          chainId: Number(network.chainId),
          walletType: 'walletconnect',
        },
      });

      toast.success('WalletConnect connected successfully');
    } catch (error) {
      console.error('Error connecting to WalletConnect:', error);
      toast.error('Failed to connect to WalletConnect');
      dispatch({ type: 'SET_CONNECTING', payload: false });
    }
  };

  const disconnect = () => {
    dispatch({ type: 'DISCONNECT' });
    toast.success('Wallet disconnected');
  };

  const getBalance = async () => {
    if (!state.provider || !state.address) return;

    try {
      const balance = await state.provider.getBalance(state.address);
      const balanceInEth = ethers.formatEther(balance);
      dispatch({ type: 'SET_BALANCE', payload: balanceInEth });
    } catch (error) {
      console.error('Error getting balance:', error);
      toast.error('Failed to get balance');
    }
  };

  useEffect(() => {
    if (state.isConnected) {
      getBalance();
    }
  }, [state.isConnected, state.address]);

  const value: Web3ContextType = {
    state,
    connectMetaMask,
    connectWalletConnect,
    disconnect,
    getBalance,
  };

  return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>;
}
