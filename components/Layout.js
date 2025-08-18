// FILE: /components/Layout.js
// DESC: Contains the shared layout, with a new Vercel-style theme changer.

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

// --- SVG Icons for the Theme Changer ---
const SunIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>;
const MoonIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>;
const SystemIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>;


// --- New Theme Changer Component ---
const ThemeChanger = () => {
    const [theme, setTheme] = useState('system');
    const [isMenuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'system';
        setTheme(savedTheme);

        const handleSystemThemeChange = (e) => {
            if (localStorage.getItem('theme') === 'system') {
                if (e.matches) {
                    document.documentElement.classList.add('dark');
                } else {
                    document.documentElement.classList.remove('dark');
                }
            }
        };

        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addEventListener('change', handleSystemThemeChange);

        // Initial check
        if (savedTheme === 'light') {
            document.documentElement.classList.remove('dark');
        } else if (savedTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            handleSystemThemeChange(mediaQuery);
        }

        return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
    }, []);

    const changeTheme = (newTheme) => {
        localStorage.setItem('theme', newTheme);
        setTheme(newTheme);
        setMenuOpen(false);
        if (newTheme === 'light') {
            document.documentElement.classList.remove('dark');
        } else if (newTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        }
    };

    const currentIcon = () => {
        if (theme === 'light') return <SunIcon />;
        if (theme === 'dark') return <MoonIcon />;
        return <SystemIcon />;
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {isMenuOpen && (
                <div className="absolute bottom-14 right-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-1 mb-2 fade-in">
                    <button onClick={() => changeTheme('light')} className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md ${theme === 'light' ? 'bg-gray-100 dark:bg-gray-700' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}><SunIcon /> Light</button>
                    <button onClick={() => changeTheme('dark')} className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md ${theme === 'dark' ? 'bg-gray-100 dark:bg-gray-700' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}><MoonIcon /> Dark</button>
                    <button onClick={() => changeTheme('system')} className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md ${theme === 'system' ? 'bg-gray-100 dark:bg-gray-700' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}><SystemIcon /> System</button>
                </div>
            )}
            <button onClick={() => setMenuOpen(!isMenuOpen)} className="w-12 h-12 flex items-center justify-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                {currentIcon()}
            </button>
        </div>
    );
};


// --- Main Layout Component ---
export default function Layout({ children }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="shortcut icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
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
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [isMobileMenuOpen]);

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
                    {/* Old theme button removed from here */}
                    <div className="hidden md:flex items-center space-x-4">
                        <Link href="/auth" className="font-medium text-brand-secondary dark:text-gray-400 hover:text-brand-text dark:hover:text-white transition-colors">
                            Login
                        </Link>
                        <Link href="/auth" className="bg-brand-signature text-white font-semibold py-2 px-5 rounded-md hover:opacity-90 transition-opacity">Start Solving</Link>
                    </div>
                    <div className="md:hidden">
                        <button onClick={() => setMobileMenuOpen(true)} className="w-10 h-10 flex items-center justify-center rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
                           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                        </button>
                    </div>
                </div>
            </nav>

            {isMobileMenuOpen && (
                <div className="md:hidden fixed inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center fade-in">
                    <button onClick={() => setMobileMenuOpen(false)} className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                    <div className="flex flex-col items-center space-y-8">
                        <Link href="/" onClick={() => setMobileMenuOpen(false)} className="font-semibold text-2xl">Home</Link>
                        <Link href="/challenges" onClick={() => setMobileMenuOpen(false)} className="font-semibold text-2xl">Challenges</Link>
                        <Link href="/profile" onClick={() => setMobileMenuOpen(false)} className="font-semibold text-2xl">Profile</Link>
                        <Link href="/auth" onClick={() => setMobileMenuOpen(false)} className="font-semibold text-2xl">Login</Link>
                        <Link href="/auth" onClick={() => setMobileMenuOpen(false)} className="w-full text-center bg-brand-signature text-white font-semibold py-3 px-8 rounded-md hover:opacity-90 transition-opacity mt-6">Start Solving</Link>
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
