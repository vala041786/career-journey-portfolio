import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Vaishali Lambe | Career Journey Portfolio',
  description: 'Scroll-based career journey portfolio across AI, data, product leadership, and agentic AI.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
