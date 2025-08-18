// FILE: /components/Layout.js
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ThemeChanger from './ThemeChanger'; // Assuming ThemeChanger is in a separate component

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </Head>
      <div className="min-h-screen flex flex-col bg-brand-background dark:bg-gradient-to-br dark:from-gray-900 dark:to-black text-brand-text dark:text-gray-200">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <ThemeChanger />
      </div>
    </>
  );
}

const Header = () => {
    const router = useRouter();
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    return (
        <header className="w-full header-border bg-brand-background/90 dark:bg-gray-900/70 backdrop-blur-sm sticky top-0 z-20">
            <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                {/* ... Header content ... */}
                <div className="relative">
                    <button onClick={() => setDropdownOpen(!isDropdownOpen)} className="font-medium text-brand-secondary dark:text-gray-400 hover:text-brand-text dark:hover:text-white transition-colors">More</button>
                    {isDropdownOpen && (
                        <div className="dropdown-menu absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-10">
                            <Link href="/leaderboard" className="block px-4 py-3 text-sm hover:bg-gray-50 dark:hover:bg-gray-700">Leaderboard</Link>
                            <Link href="/contact" className="block px-4 py-3 text-sm hover:bg-gray-50 dark:hover:bg-gray-700">Contact</Link>
                        </div>
                    )}
                </div>
            </nav>
        </header>
    );
};

const Footer = () => (
    <footer className="w-full py-8 border-t border-gray-200 dark:border-gray-800 bg-transparent">
        <div className="container mx-auto px-6 text-center text-gray-500 dark:text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} BizSolve. All rights reserved.
        </div>
    </footer>
);

// NOTE: You would also create a ThemeChanger.js component with the logic from the previous step.
