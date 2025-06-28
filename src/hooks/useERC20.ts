'use client';

import { useState } from 'react';
import { ethers } from 'ethers';
import { useWeb3 } from '@/providers/Web3Provider';
import toast from 'react-hot-toast';

const ERC20_ABI = [
  'function name() view returns (string)',
  'function symbol() view returns (string)',
  'function decimals() view returns (uint8)',
  'function totalSupply() view returns (uint256)',
  'function balanceOf(address owner) view returns (uint256)',
  'function transfer(address to, uint256 amount) returns (bool)',
  'function allowance(address owner, address spender) view returns (uint256)',
  'function approve(address spender, uint256 amount) returns (bool)',
  'event Transfer(address indexed from, address indexed to, uint256 value)',
];

export interface TokenInfo {
  name: string;
  symbol: string;
  decimals: number;
  balance: string;
}

export function useERC20() {
  const { state } = useWeb3();
  const [loading, setLoading] = useState(false);
  const [tokenInfo, setTokenInfo] = useState<TokenInfo | null>(null);

  const getTokenInfo = async (
    tokenAddress: string
  ): Promise<TokenInfo | null> => {
    if (!state.provider || !state.address) {
      toast.error('Wallet not connected');
      return null;
    }

    try {
      setLoading(true);
      const contract = new ethers.Contract(
        tokenAddress,
        ERC20_ABI,
        state.provider
      );

      const [name, symbol, decimals, balance] = await Promise.all([
        contract.name(),
        contract.symbol(),
        contract.decimals(),
        contract.balanceOf(state.address),
      ]);

      const tokenInfo = {
        name,
        symbol,
        decimals: Number(decimals),
        balance: ethers.formatUnits(balance, decimals),
      };

      setTokenInfo(tokenInfo);
      return tokenInfo;
    } catch (error) {
      console.error('Error getting token info:', error);
      toast.error('Failed to get token information');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const transferTokens = async (
    tokenAddress: string,
    toAddress: string,
    amount: string
  ): Promise<boolean> => {
    if (!state.signer) {
      toast.error('Wallet not connected');
      return false;
    }

    try {
      setLoading(true);
      const contract = new ethers.Contract(
        tokenAddress,
        ERC20_ABI,
        state.signer
      );

      // Get token decimals
      const decimals = await contract.decimals();
      const amountWei = ethers.parseUnits(amount, decimals);

      // Check balance
      const balance = await contract.balanceOf(state.address);
      if (balance < amountWei) {
        toast.error('Insufficient token balance');
        return false;
      }

      // Execute transfer
      const tx = await contract.transfer(toAddress, amountWei);
      toast.loading('Transaction submitted, waiting for confirmation...', {
        id: 'transfer',
      });

      await tx.wait();
      toast.success('Transfer completed successfully!', { id: 'transfer' });

      // Refresh token info
      await getTokenInfo(tokenAddress);

      return true;
    } catch (error: any) {
      console.error('Error transferring tokens:', error);
      const errorMessage = error.reason || error.message || 'Transfer failed';
      toast.error(errorMessage, { id: 'transfer' });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const getTokenBalance = async (
    tokenAddress: string
  ): Promise<string | null> => {
    if (!state.provider || !state.address) return null;

    try {
      const contract = new ethers.Contract(
        tokenAddress,
        ERC20_ABI,
        state.provider
      );
      const [balance, decimals] = await Promise.all([
        contract.balanceOf(state.address),
        contract.decimals(),
      ]);

      return ethers.formatUnits(balance, decimals);
    } catch (error) {
      console.error('Error getting token balance:', error);
      return null;
    }
  };

  return {
    loading,
    tokenInfo,
    getTokenInfo,
    transferTokens,
    getTokenBalance,
  };
}
