export const revalidate = 3600;

export const metadata = {
  title: 'EnMate Blog | Authority Insights on Digital Growth, Web Engineering & SEO',
  description: 'Deep dive into tactical articles crafted by the EnMate Team to scale your local presence, design high-converting applications, and capture traffic globally.',
  alternates: { canonical: 'https://enmate.in/blog' }
};

export default function BlogLayout({ children }) {
  return <>{children}</>;
}