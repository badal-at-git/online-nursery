import type { Metadata } from 'next';
import './globals.css';
import ModernInteractive from '../components/ModernInteractive';

export const metadata: Metadata = {
  title: 'Online Nursery - Premium Plants & Flowers',
  description: 'Discover our curated collection of rare plants, fresh flowers, and garden essentials. Transform your space with nature.',
  keywords: 'plants, flowers, indoor plants, succulents, bouquets, garden, green, nature, online nursery',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ModernInteractive />
        {children}
      </body>
    </html>
  );
}