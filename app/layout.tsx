import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'The Auperating System',
  description: 'An AI-native operating system for autonomous projects, agents, memory, secrets, and deployment.',
  metadataBase: new URL('https://auperating.system'),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
