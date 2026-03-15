import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/components/AuthProvider';

export const metadata: Metadata = {
  title: 'כותבים קוד | לומדים לתכנת בכיף!',
  description:
    'פלטפורמת למידה אינטראקטיבית לילדים - למדו לתכנת בפייתון בעברית!',
  keywords: ['תכנות', 'ילדים', 'פייתון', 'למידה', 'קוד', 'עברית'],
  openGraph: {
    title: 'כותבים קוד',
    description: 'למדו לתכנת בכיף! פלטפורמה אינטראקטיבית לילדים',
    url: 'https://kotvim-code.luposec.io',
    siteName: 'כותבים קוד',
    locale: 'he_IL',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <body className="font-heebo antialiased min-h-screen">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
