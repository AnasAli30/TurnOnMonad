'use client'

import { FarcasterActions } from '@/components/Home/FarcasterActions'
import { User } from '@/components/Home/User'
import { WalletActions } from '@/components/Home/WalletActions'
import ChessGame from './ChessGame'

export function Demo() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 space-y-8">
      {/* <div className="w-full max-w-4xl space-y-6"> */}
        <ChessGame />
        {/* <User />
        <FarcasterActions />
        <WalletActions /> */}
      {/* </div> */}
    </div>
  )
}
