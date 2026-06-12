import localFont from 'next/font/local';
import './globals.css';

const anokhaFont = localFont({
  src: '../../public/fonts/Anokha.ttf',
  variable: '--font-anokha',
  display: 'swap',
});

export const metadata = {
  title: 'EnMate Digital Marketing Agency | Premium Web & Growth Solutions',
  description: 'EnMate Digital Marketing Agency specializes in high-performance website development, branding identity systems, SEO visibility, and dynamic marketing models to scale your business online.',
  alternates: {
    canonical: 'https://enmate.in',
  },
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
              "sameAs": [
                "https://instagram.com/yourpage",
                "https://linkedin.com/company/yourpage",
                "https://x.com/yourpage"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "yournumber",
                "contactType": "customer service"
              }
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