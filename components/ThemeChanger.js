// FILE: /components/ThemeChanger.js
// DESC: The new Vercel-style theme changer component.

import React, { useState, useEffect } from 'react';

// --- SVG Icons for the Theme Changer ---
const SunIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>;
const MoonIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>;
const SystemIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>;


export default function ThemeChanger() {
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
