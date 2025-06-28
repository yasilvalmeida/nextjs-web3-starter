import Link from 'next/link';
import { WalletConnector } from '@/components/WalletConnector';

export default function Home() {
  return (
    <main className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100'>
      <div className='container mx-auto px-4 py-16'>
        <div className='text-center mb-12'>
          <h1 className='text-4xl font-bold text-gray-900 mb-4'>
            Next.js Web3 Starter
          </h1>
          <p className='text-xl text-gray-600 max-w-2xl mx-auto'>
            A modern Web3 application built with Next.js 15, featuring MetaMask
            and WalletConnect integration
          </p>
        </div>

        <div className='max-w-md mx-auto mb-12'>
          <WalletConnector />
        </div>

        <div className='grid md:grid-cols-2 gap-8 max-w-4xl mx-auto'>
          <Link
            href='/balance'
            className='card hover:shadow-lg transition-shadow duration-200'
          >
            <div className='text-center'>
              <div className='w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                <svg
                  className='w-8 h-8 text-primary-600'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1'
                  />
                </svg>
              </div>
              <h2 className='text-xl font-semibold mb-2'>
                Check Token Balance
              </h2>
              <p className='text-gray-600'>
                Connect your wallet and check ERC20 token balances
              </p>
            </div>
          </Link>

          <Link
            href='/transfer'
            className='card hover:shadow-lg transition-shadow duration-200'
          >
            <div className='text-center'>
              <div className='w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                <svg
                  className='w-8 h-8 text-green-600'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M12 19l9 2-9-18-9 18 9-2zm0 0v-8'
                  />
                </svg>
              </div>
              <h2 className='text-xl font-semibold mb-2'>Send Tokens</h2>
              <p className='text-gray-600'>
                Transfer ERC20 tokens to other addresses
              </p>
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}
