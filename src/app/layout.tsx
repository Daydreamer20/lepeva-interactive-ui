import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'LEPEVA - Fun English Learning for Kids',
  description: 'Interactive English learning platform connecting Filipino teachers with young learners',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bubblegum+Sans&family=Comic+Neue:wght@400;700&family=Varela+Round&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-round text-slate-700 bg-sky-50">
        <div className="min-h-screen flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}