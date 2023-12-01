import type { Metadata, Viewport } from 'next';
import './reset.css';
import './tailwind.css';
import { Nav } from '@components';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale:1.0
};

export const metadata: Metadata = {
  title: 'Minton GG',
  description: 'minton gg pwa',
  manifest: "/manifest.json",
  icons: {
    other: [
      {
       rel:"icon",url:"/icons/favicon-192x192.png", type:"image/png"
      },
      {
        rel:"alternate icon", url:"/icons/favicon.ico", type:"ico", sizes:"16x16"
      },
      {
        rel:"apple-touch-icon", url:"/icons/apple-touch-icon.png", sizes:"180x180"
      }
    ]
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
      <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        {children}
      </div>
      <div className="shrink-0">
        <Nav />
      </div>
    </div>
        </body>
    </html>
  );
}
