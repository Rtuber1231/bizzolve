// FILE: /components/Layout.js
// DESC: Contains the shared layout, including Header and Footer.

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Layout({ children }) {
  const [theme, setTheme] = useState('light');
  
  useEffect(() => {
    if (localStorage.getItem('theme')) {
      setTheme(localStorage.getItem('theme'));
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    }
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="shortcut icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
      </Head>
      <div className="min-h-screen flex flex-col bg-brand-background dark:bg-gradient-to-br dark:from-gray-900 dark:to-black text-brand-text dark:text-gray-200">
        <Header theme={theme} toggleTheme={toggleTheme} />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    </>
  );
}

const Header = ({ theme, toggleTheme }) => {
    const router = useRouter();
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="w-full header-border bg-brand-background/90 dark:bg-gray-900/70 backdrop-blur-sm sticky top-0 z-20">
            <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                <div className="flex items-center space-x-10">
                    <Link href="/" className="flex items-center space-x-2 text-2xl font-bold cursor-pointer">
                        <img src="/favicon.svg" alt="BizSolve Logo" className="h-8 w-8" />
                        <span>BizSolve</span>
                    </Link>
                    <div className="hidden md:flex items-center space-x-1">
                        <Link href="/" className={`font-medium px-4 py-2 rounded-md transition-colors ${router.pathname === '/' ? 'bg-gray-100 dark:bg-gray-800' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}>Home</Link>
                        <Link href="/challenges" className={`font-medium px-4 py-2 rounded-md transition-colors ${router.pathname === '/challenges' ? 'bg-gray-100 dark:bg-gray-800' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}>Challenges</Link>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <button onClick={toggleTheme} className="w-10 h-10 flex items-center justify-center rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
                        {theme === 'light' ? 
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg> : 
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                        }
                    </button>
                    <div className="hidden md:flex items-center space-x-4">
                        <Link href="/auth" className="font-medium text-brand-secondary dark:text-gray-400 hover:text-brand-text dark:hover:text-white transition-colors">
                            Login
                        </Link>
                        <Link href="/auth" className="bg-brand-signature text-white font-semibold py-2 px-5 rounded-md hover:opacity-90 transition-opacity">Start Solving</Link>
                    </div>
                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button onClick={() => setMobileMenuOpen(!isMobileMenuOpen)} className="w-10 h-10 flex items-center justify-center rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-gray-900 border-b dark:border-gray-800 shadow-md">
                    <div className="flex flex-col items-center space-y-4 p-6">
                        <Link href="/" onClick={() => setMobileMenuOpen(false)} className="font-medium text-lg">Home</Link>
                        <Link href="/challenges" onClick={() => setMobileMenuOpen(false)} className="font-medium text-lg">Challenges</Link>
                        <Link href="/profile" onClick={() => setMobileMenuOpen(false)} className="font-medium text-lg">Profile</Link>
                        <Link href="/auth" onClick={() => setMobileMenuOpen(false)} className="font-medium text-lg">Login</Link>
                        <Link href="/auth" onClick={() => setMobileMenuOpen(false)} className="w-full text-center bg-brand-signature text-white font-semibold py-3 px-5 rounded-md hover:opacity-90 transition-opacity mt-4">Start Solving</Link>
                    </div>
                </div>
            )}
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
