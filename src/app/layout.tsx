import type { Metadata, Viewport } from 'next';
import { Inter, Noto_Sans_SC, Playfair_Display, Noto_Serif_SC, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const notoSans = Noto_Sans_SC({ subsets: ['latin'], weight: ['400', '500', '700'], variable: '--font-noto-sans', display: 'swap' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair', display: 'swap' });
const notoSerif = Noto_Serif_SC({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-noto-serif', display: 'swap' });
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' });

export const metadata: Metadata = {
  title: 'NewsSphere · 新闻星球',
  description: '新闻不是信息流，而是一个有生命的世界。探索、沉浸、发现。',
  manifest: '/manifest.json',
  icons: {
    icon: '/icons/icon-192.png',
    apple: '/icons/icon-192.png',
  },
};

export const viewport: Viewport = {
  themeColor: '#0a0a1a',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="zh-CN"
      suppressHydrationWarning
      className={`${inter.variable} ${notoSans.variable} ${playfair.variable} ${notoSerif.variable} ${jetbrains.variable}`}
    >
      <head>
        <meta name="theme-color" content="#0a0a1a" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="新闻星球" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
      </head>
      <body>
        <div id="main-content" tabIndex={-1}>
          {children}
        </div>
        {/* Service Worker Registration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').then(
                    function(registration) { console.log('SW registered:', registration.scope); },
                    function(err) { console.log('SW registration failed:', err); }
                  );
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
