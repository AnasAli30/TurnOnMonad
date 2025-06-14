import App from '@/components/pages/app'
import { APP_URL } from '@/lib/constants'
import type { Metadata } from 'next'

const frame = {
  version: 'next',
  imageUrl: `${APP_URL}/images/feed.png`,
  button: {
    title: 'Launch Game',
    action: {
      type: 'launch_frame',
      name: 'TurnOnMonad',
      url: APP_URL,
      splashImageUrl: `${APP_URL}/images/splash.png`,
      splashBackgroundColor: '#f7f7f7',
    },
  },
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL(APP_URL || 'http://localhost:3000'),
    title: 'Monad Farcaster MiniApp Template',
    openGraph: {
      title: 'Monad Farcaster MiniApp Template',
      description: 'A template for building mini-apps on Farcaster and Monad',
    },
    other: {
      'fc:frame': JSON.stringify(frame),
    },
  }
}

export default function Home() {
  return <App />
}
