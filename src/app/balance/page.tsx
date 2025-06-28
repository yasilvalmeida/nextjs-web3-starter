'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useWeb3 } from '@/providers/Web3Provider';
import { useERC20 } from '@/hooks/useERC20';
import { isValidAddress, formatBalance } from '@/lib/utils';
import toast from 'react-hot-toast';

export default function BalancePage() {
  const { state } = useWeb3();
  const { loading, tokenInfo, getTokenInfo } = useERC20();
  const [tokenAddress, setTokenAddress] = useState('');

  const handleCheckBalance = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidAddress(tokenAddress)) {
      toast.error('Please enter a valid token address');
      return;
    }

    await getTokenInfo(tokenAddress);
  };

  const popularTokens = [
    {
      name: 'USDC',
      address: '0xA0b86a33E6441c5a3C2C8Eb9aa9b8bbF14A8e5F5',
      symbol: 'USDC',
    },
    {
      name: 'USDT',
      address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
      symbol: 'USDT',
    },
    {
      name: 'DAI',
      address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
      symbol: 'DAI',
    },
  ];

  if (!state.isConnected) {
    return (
      <main className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100'>
        <div className='container mx-auto px-4 py-16'>
          <div className='max-w-md mx-auto'>
            <div className='card text-center'>
              <div className='w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                <svg
                  className='w-8 h-8 text-red-600'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z'
                  />
                </svg>
              </div>
              <h2 className='text-xl font-semibold mb-2'>
                Wallet Not Connected
              </h2>
              <p className='text-gray-600 mb-4'>
                Please connect your wallet to check token balances
              </p>
              <Link href='/' className='btn-primary'>
                Go Home
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100'>
      <div className='container mx-auto px-4 py-16'>
        <div className='max-w-2xl mx-auto'>
          <div className='text-center mb-8'>
            <Link
              href='/'
              className='text-primary-600 hover:text-primary-700 mb-4 inline-block'
            >
              ← Back to Home
            </Link>
            <h1 className='text-3xl font-bold text-gray-900 mb-2'>
              Token Balance Checker
            </h1>
            <p className='text-gray-600'>Check your ERC20 token balances</p>
          </div>

          <div className='card mb-8'>
            <h2 className='text-xl font-semibold mb-4'>Check Token Balance</h2>
            <form onSubmit={handleCheckBalance} className='space-y-4'>
              <div>
                <label
                  htmlFor='tokenAddress'
                  className='block text-sm font-medium text-gray-700 mb-2'
                >
                  Token Contract Address
                </label>
                <input
                  id='tokenAddress'
                  type='text'
                  value={tokenAddress}
                  onChange={(e) => setTokenAddress(e.target.value)}
                  placeholder='0x...'
                  className='input'
                  required
                />
              </div>
              <button
                type='submit'
                disabled={loading || !tokenAddress}
                className='btn-primary w-full'
              >
                {loading ? 'Checking...' : 'Check Balance'}
              </button>
            </form>
          </div>

          <div className='card mb-8'>
            <h3 className='text-lg font-semibold mb-4'>Popular Tokens</h3>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-3'>
              {popularTokens.map((token) => (
                <button
                  key={token.address}
                  onClick={() => setTokenAddress(token.address)}
                  className='p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left'
                >
                  <div className='font-medium'>{token.name}</div>
                  <div className='text-sm text-gray-600'>{token.symbol}</div>
                </button>
              ))}
            </div>
          </div>

          {tokenInfo && (
            <div className='card'>
              <h3 className='text-lg font-semibold mb-4'>Token Information</h3>
              <div className='space-y-3'>
                <div className='flex justify-between'>
                  <span className='text-gray-600'>Name:</span>
                  <span className='font-medium'>{tokenInfo.name}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-gray-600'>Symbol:</span>
                  <span className='font-medium'>{tokenInfo.symbol}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-gray-600'>Decimals:</span>
                  <span className='font-medium'>{tokenInfo.decimals}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-gray-600'>Your Balance:</span>
                  <span className='font-medium text-lg'>
                    {formatBalance(tokenInfo.balance)} {tokenInfo.symbol}
                  </span>
                </div>
              </div>

              {parseFloat(tokenInfo.balance) > 0 && (
                <div className='mt-6 pt-4 border-t'>
                  <Link
                    href={`/transfer?token=${tokenAddress}`}
                    className='btn-primary w-full text-center block'
                  >
                    Transfer {tokenInfo.symbol}
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
