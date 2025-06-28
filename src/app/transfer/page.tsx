'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useWeb3 } from '@/providers/Web3Provider';
import { useERC20 } from '@/hooks/useERC20';
import { isValidAddress, isValidAmount, formatBalance } from '@/lib/utils';
import toast from 'react-hot-toast';

export default function TransferPage() {
  const { state } = useWeb3();
  const { loading, tokenInfo, getTokenInfo, transferTokens } = useERC20();
  const searchParams = useSearchParams();

  const [tokenAddress, setTokenAddress] = useState('');
  const [recipientAddress, setRecipientAddress] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    const tokenParam = searchParams.get('token');
    if (tokenParam && isValidAddress(tokenParam)) {
      setTokenAddress(tokenParam);
      getTokenInfo(tokenParam);
    }
  }, [searchParams, getTokenInfo]);

  const handleGetTokenInfo = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidAddress(tokenAddress)) {
      toast.error('Please enter a valid token address');
      return;
    }

    await getTokenInfo(tokenAddress);
  };

  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidAddress(recipientAddress)) {
      toast.error('Please enter a valid recipient address');
      return;
    }

    if (!isValidAmount(amount)) {
      toast.error('Please enter a valid amount');
      return;
    }

    if (!tokenInfo) {
      toast.error('Please load token information first');
      return;
    }

    const success = await transferTokens(
      tokenAddress,
      recipientAddress,
      amount
    );

    if (success) {
      setRecipientAddress('');
      setAmount('');
    }
  };

  const setMaxAmount = () => {
    if (tokenInfo) {
      setAmount(tokenInfo.balance);
    }
  };

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
                Please connect your wallet to transfer tokens
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
              Transfer Tokens
            </h1>
            <p className='text-gray-600'>
              Send ERC20 tokens to another address
            </p>
          </div>

          {!tokenInfo ? (
            <div className='card mb-8'>
              <h2 className='text-xl font-semibold mb-4'>
                Load Token Information
              </h2>
              <form onSubmit={handleGetTokenInfo} className='space-y-4'>
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
                  {loading ? 'Loading...' : 'Load Token Info'}
                </button>
              </form>
            </div>
          ) : (
            <>
              <div className='card mb-8'>
                <h2 className='text-xl font-semibold mb-4'>
                  Token Information
                </h2>
                <div className='bg-gray-50 rounded-lg p-4 space-y-2'>
                  <div className='flex justify-between'>
                    <span className='text-gray-600'>Token:</span>
                    <span className='font-medium'>
                      {tokenInfo.name} ({tokenInfo.symbol})
                    </span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-gray-600'>Your Balance:</span>
                    <span className='font-medium'>
                      {formatBalance(tokenInfo.balance)} {tokenInfo.symbol}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => getTokenInfo(tokenAddress)}
                  className='btn-secondary mt-4 text-sm'
                >
                  Refresh Balance
                </button>
              </div>

              <div className='card'>
                <h2 className='text-xl font-semibold mb-4'>Transfer Details</h2>
                <form onSubmit={handleTransfer} className='space-y-4'>
                  <div>
                    <label
                      htmlFor='recipient'
                      className='block text-sm font-medium text-gray-700 mb-2'
                    >
                      Recipient Address
                    </label>
                    <input
                      id='recipient'
                      type='text'
                      value={recipientAddress}
                      onChange={(e) => setRecipientAddress(e.target.value)}
                      placeholder='0x...'
                      className='input'
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor='amount'
                      className='block text-sm font-medium text-gray-700 mb-2'
                    >
                      Amount
                    </label>
                    <div className='relative'>
                      <input
                        id='amount'
                        type='number'
                        step='any'
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder='0.0'
                        className='input pr-16'
                        required
                      />
                      <button
                        type='button'
                        onClick={setMaxAmount}
                        className='absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-primary-600 hover:text-primary-700'
                      >
                        MAX
                      </button>
                    </div>
                    <p className='text-sm text-gray-500 mt-1'>
                      Available: {formatBalance(tokenInfo.balance)}{' '}
                      {tokenInfo.symbol}
                    </p>
                  </div>

                  <button
                    type='submit'
                    disabled={
                      loading ||
                      !recipientAddress ||
                      !amount ||
                      parseFloat(amount) <= 0
                    }
                    className='btn-primary w-full'
                  >
                    {loading
                      ? 'Transferring...'
                      : `Transfer ${tokenInfo.symbol}`}
                  </button>
                </form>
              </div>
            </>
          )}

          <div className='mt-8 text-center'>
            <Link
              href='/balance'
              className='text-primary-600 hover:text-primary-700'
            >
              Check Token Balances
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
