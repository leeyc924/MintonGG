import type { Metadata, Viewport } from 'next';
import './reset.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Box from '@mui/material/Box';
import { Nav } from '@components';
import LocalizationProvider from './LocalizationProvider';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
};

export const metadata: Metadata = {
  title: 'Minton GG',
  description: 'minton gg pwa',
  manifest: 'manifest.json',
  icons: {
    other: [
      {
        rel: 'icon',
        url: '/icons/favicon-192x192.png',
        type: 'image/png',
      },
      {
        rel: 'alternate icon',
        url: '/icons/favicon.ico',
        type: 'ico',
        sizes: '16x16',
      },
      {
        rel: 'apple-touch-icon',
        url: '/icons/apple-touch-icon.png',
        sizes: '180x180',
      },
    ],
  },
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <LocalizationProvider>
          <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Box sx={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>{props.children}</Box>
            <Box sx={{ flexShrink: 0, width: '100%' }}>
              <Nav />
            </Box>
          </Box>
        </LocalizationProvider>
        <ToastContainer autoClose={3000} position="bottom-right" />
      </body>
    </html>
  );
}
