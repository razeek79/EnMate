import localFont from 'next/font/local';
import './globals.css';

const anokhaFont = localFont({
  src: '../../public/fonts/Anokha.ttf',
  variable: '--font-anokha',
  display: 'swap',
});

// Elite SEO Metadata Configuration with complete device icon mapping
export const metadata = {
  title: 'EnMate Digital Marketing Agency | Based in Kottakkal, Serving Worldwide',
  description: 'EnMate is a premium digital marketing agency based in Kottakkal, Kerala, India, serving clients locally & worldwide. We specialize in custom web architecture, visual branding identity layouts, and global customer acquisition funnels.',
  alternates: {
    canonical: 'https://enmate.in',
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${anokhaFont.variable}`}>
      <head>
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" 
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "DigitalMarketingAgency",
              "name": "EnMate Digital Marketing Agency",
              "url": "https://enmate.in",
              "logo": "https://enmate.in/logos/site-logo.png",
              "email": "enmate.digital@gmail.com",
              "telephone": "+918138881132",
              "description": "Based in Kottakkal, Kerala, India, serving clients locally & worldwide with premium web engineering and conversion-driven performance marketing strategies.",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Kottakkal",
                "addressRegion": "Kerala",
                "addressCountry": "IN"
              },
              "areaServed": [
                { "@type": "AdministrativeArea", "name": "Kottakkal" },
                { "@type": "AdministrativeArea", "name": "Kerala" },
                { "@type": "AdministrativeArea", "name": "India" },
                { "@type": "Country", "name": "Worldwide" }
              ]
            })
          }}
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}