// File: components/Layout.js
import Head from 'next/head';
import Navbar from './Navbar';

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>TBH-Game-Reviews</title>
        <meta name="description" content="Game review and information platform" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className="container mx-auto px-4 py-8">{children}</main>
    </>
  );
}