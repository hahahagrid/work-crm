import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Sales CRM',
  description: 'Custom internal CRM for sales tracking',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
