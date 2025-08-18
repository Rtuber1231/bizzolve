// FILE: /components/Layout.js
// DESC: Contains the shared layout, including Header and Footer.

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Layout({ children }) {
  const [theme, setTheme] = useState('light');
  
  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    }
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  return (
    <div className="min-h-screen flex flex-col bg-brand-background dark:bg-gradient-to-br dark:from-gray-900 dark:to-black text-brand-text dark:text-gray-200">
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}

const Header = ({ theme, toggleTheme }) => {
    const router = useRouter();
    return (
        <header className="w-full header-border bg-brand-background/90 dark:bg-gray-900/70 backdrop-blur-sm sticky top-0 z-20">
            <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                <div className="flex items-center space-x-10">
                    <Link href="/" className="text-2xl font-bold cursor-pointer">BizSolve</Link>
                    <div className="hidden md:flex items-center space-x-1">
                        <Link href="/" className={`font-medium px-4 py-2 rounded-md transition-colors ${router.pathname === '/' ? 'bg-gray-100 dark:bg-gray-800' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}>Home</Link>
                        <Link href="/challenges" className={`font-medium px-4 py-2 rounded-md transition-colors ${router.pathname === '/challenges' ? 'bg-gray-100 dark:bg-gray-800' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}>Challenges</Link>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <button onClick={toggleTheme} className="w-10 h-10 flex items-center justify-center rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
                        {/* Icons would go here */}
                    </button>
                    <Link href="/auth" className="font-medium text-brand-secondary dark:text-gray-400 hover:text-brand-text dark:hover:text-white transition-colors">
                        Login
                    </Link>
                    <button className="bg-brand-signature text-white font-semibold py-2 px-5 rounded-md hover:opacity-90 transition-opacity hidden sm:block">Start Solving</button>
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
