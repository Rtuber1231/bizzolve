// FILE: /pages/_app.js
import '../styles/globals.css';
import Layout from '../components/Layout';
import { SessionProvider } from '../context/SessionContext';

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}

export default MyApp;
