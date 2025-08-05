import 'bootstrap/dist/css/bootstrap.min.css';
import ReactQueryClientProvider from './react-query-provider';
import Navbar from './components/Navbar.jsx';

export const metadata = {
  title: 'Netflix Clone',
  description: 'A fullstack Netflix clone using Next.js + NestJS',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ReactQueryClientProvider>
          <Navbar />
          <main className="pt-4">{children}</main>
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}
