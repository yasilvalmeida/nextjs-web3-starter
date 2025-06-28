'use client';

import { useWeb3 } from '@/providers/Web3Provider';
import { cn } from '@/lib/utils';

export function WalletConnector() {
  const { state, connectMetaMask, connectWalletConnect, disconnect } =
    useWeb3();

  if (state.isConnected) {
    return (
      <div className='card'>
        <div className='flex items-center justify-between'>
          <div>
            <p className='text-sm text-gray-600'>
              Connected with {state.walletType}
            </p>
            <p className='font-mono text-sm'>
              {state.address?.slice(0, 6)}...{state.address?.slice(-4)}
            </p>
            {state.balance && (
              <p className='text-sm text-gray-600'>
                Balance: {parseFloat(state.balance).toFixed(4)} ETH
              </p>
            )}
          </div>
          <button onClick={disconnect} className='btn-secondary text-sm'>
            Disconnect
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='card'>
      <h2 className='text-xl font-semibold mb-4 text-center'>Connect Wallet</h2>
      <div className='space-y-3'>
        <button
          onClick={connectMetaMask}
          disabled={state.isConnecting}
          className={cn(
            'w-full flex items-center justify-center gap-3 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors',
            state.isConnecting && 'opacity-50 cursor-not-allowed'
          )}
        >
          <div className='w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center'>
            <span className='text-white font-bold text-sm'>M</span>
          </div>
          <span className='font-medium'>
            {state.isConnecting ? 'Connecting...' : 'MetaMask'}
          </span>
        </button>

        <button
          onClick={connectWalletConnect}
          disabled={state.isConnecting}
          className={cn(
            'w-full flex items-center justify-center gap-3 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors',
            state.isConnecting && 'opacity-50 cursor-not-allowed'
          )}
        >
          <div className='w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center'>
            <span className='text-white font-bold text-sm'>W</span>
          </div>
          <span className='font-medium'>
            {state.isConnecting ? 'Connecting...' : 'WalletConnect'}
          </span>
        </button>
      </div>
    </div>
  );
}
