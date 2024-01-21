import type { Metadata, Viewport } from 'next';
import './reset.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Box from '@mui/material/Box';
import Script from 'next/script';
import { Nav } from '@components';
import LocalizationProvider from './LocalizationProvider';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
  themeColor: 'black',
};

export const metadata: Metadata = {
  icons: {
    other: [
      {
        rel: 'alternate icon',
        url: '/favicon.ico',
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
        {/* <Script src="/service-worker.js" /> */}
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
