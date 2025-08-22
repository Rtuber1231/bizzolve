// FILE: /components/Layout.js
// DESC: Contains the shared layout, with improved dropdowns that close on outside clicks.

import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ThemeChanger from './ThemeChanger';

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
    const [isUserMenuOpen, setUserMenuOpen] = useState(false);
    const [isMoreMenuOpen, setMoreMenuOpen] = useState(false);
    
    const userMenuRef = useRef(null);
    const moreMenuRef = useRef(null);
    
    // This is a placeholder. In a real app, you'd get this from a session
    const isLoggedIn = true; 
    const userAvatarUrl = "https://i.pravatar.cc/40?u=1";

    useEffect(() => {
        if (isMobileMenuOpen) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = 'auto';
    }, [isMobileMenuOpen]);

    // Effect to handle clicks outside of the dropdowns
    useEffect(() => {
        function handleClickOutside(event) {
            if (userMenuRef.current && !userMenu-ref.current.contains(event.target)) {
                setUserMenuOpen(false);
            }
            if (moreMenuRef.current && !moreMenuRef.current.contains(event.target)) {
                setMoreMenuOpen(false);
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [userMenuRef, moreMenuRef]);

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
                        {/* More Dropdown */}
                        <div className="relative" ref={moreMenuRef}>
                            <button onClick={() => setMoreMenuOpen(!isMoreMenuOpen)} className="font-medium px-4 py-2 rounded-md transition-colors text-brand-secondary dark:text-gray-400 hover:text-brand-text dark:hover:text-white flex items-center gap-1">
                                <span>More</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform ${isMoreMenuOpen ? 'rotate-180' : ''}`}><polyline points="6 9 12 15 18 9"></polyline></svg>
                            </button>
                            {isMoreMenuOpen && (
                                <div className="dropdown-menu absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-10">
                                    <Link href="/leaderboard" className="block px-4 py-3 text-sm hover:bg-gray-50 dark:hover:bg-gray-700">Leaderboard</Link>
                                    <Link href="/contact" className="block px-4 py-3 text-sm hover:bg-gray-50 dark:hover:bg-gray-700">Contact Us</Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <div className="hidden md:flex items-center space-x-4">
                        {isLoggedIn ? (
                            <div className="relative" ref={userMenuRef}>
                                <button onClick={() => setUserMenuOpen(!isUserMenuOpen)}>
                                    <img src={userAvatarUrl} alt="User Avatar" className="w-10 h-10 rounded-full border-2 border-transparent hover:border-brand-signature transition-colors" />
                                </button>
                                {isUserMenuOpen && (
                                    <div className="dropdown-menu absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-10">
                                        <Link href="/profile" className="block px-4 py-3 text-sm hover:bg-gray-50 dark:hover:bg-gray-700">My Profile</Link>
                                        <Link href="/my-challenges" className="block px-4 py-3 text-sm hover:bg-gray-50 dark:hover:bg-gray-700">My Challenges</Link>
                                        <div className="border-t dark:border-gray-700 my-1"></div>
                                        <button className="w-full text-left px-4 py-3 text-sm text-red-600 dark:text-red-400 hover:bg-gray-50 dark:hover:bg-gray-700">Logout</button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <>
                                <Link href="/auth" className="font-medium text-brand-secondary dark:text-gray-400 hover:text-brand-text dark:hover:text-white transition-colors">Login</Link>
                                <Link href="/auth" className="bg-brand-signature text-white font-semibold py-2 px-5 rounded-md hover:opacity-90 transition-opacity">Start Solving</Link>
                            </>
                        )}
                    </div>
                    <div className="md:hidden">
                        <button onClick={() => setMobileMenuOpen(true)} className="w-10 h-10 flex items-center justify-center rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
                           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu ... */}
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
