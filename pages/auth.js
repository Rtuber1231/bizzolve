// FILE: /pages/auth.js
// DESC: A new page for user signup and login.

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import PasswordStrength from '../components/PasswordStrength';
import Toast from '../components/Toast';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', username: '', password: '' });
  const [usernameAvailable, setUsernameAvailable] = useState(null);
  const [toast, setToast] = useState(null);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Debounce effect for username checking
  useEffect(() => {
    if (isLogin || formData.username.length < 3) {
      setUsernameAvailable(null);
      return;
    }

    const timer = setTimeout(() => {
      const checkUsername = async () => {
        try {
          const res = await fetch('/api/auth/check-username', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: formData.username }),
          });
          const data = await res.json();
          setUsernameAvailable(data.available);
        } catch (error) {
          console.error("Failed to check username", error);
        }
      };
      checkUsername();
    }, 500); // Wait 500ms after user stops typing

    return () => clearTimeout(timer);
  }, [formData.username, isLogin]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isLogin ? '/api/auth/login' : '/api/auth/signup';
    
    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });
        const data = await res.json();

        if (res.ok) {
            setToast({ message: data.message, type: 'success' });
            // In a real app with NextAuth, you would redirect here
        } else {
            setToast({ message: data.message, type: 'error' });
        }
    } catch (error) {
        setToast({ message: "An error occurred. Please try again.", type: 'error' });
    }
  };

  return (
    <>
      <Head>
        <title>{isLogin ? 'Login' : 'Sign Up'} - BizSolve</title>
      </Head>
      {toast && <Toast message={toast.message} type={toast.type} onDone={() => setToast(null)} />}
      <div className="container mx-auto px-6 py-12 flex justify-center fade-in">
        <div className="w-full max-w-md">
          <div className="bg-white dark:bg-gray-800/70 border border-gray-200 dark:border-gray-700 rounded-xl p-8 shadow-sm">
            <h2 className="text-3xl font-bold text-center mb-2">{isLogin ? 'Welcome Back' : 'Create an Account'}</h2>
            <p className="text-brand-secondary dark:text-gray-400 text-center mb-8">
              {isLogin ? 'Log in to continue your journey.' : 'Join the network of top solvers and companies.'}
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {!isLogin && (
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                  <input type="text" name="name" id="name" required onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                </div>
              )}

              {!isLogin && (
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Username</label>
                  <div className="relative">
                    <input type="text" name="username" id="username" required onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                    {usernameAvailable === true && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 text-xs">Available</span>}
                    {usernameAvailable === false && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500 text-xs">Taken</span>}
                  </div>
                </div>
              )}
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                <input type="email" name="email" id="email" required onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                <input type="password" name="password" id="password" required onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                {!isLogin && <PasswordStrength password={formData.password} />}
              </div>
              
              <div>
                <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-signature hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  {isLogin ? 'Log In' : 'Create Account'}
                </button>
              </div>
            </form>

            <div className="mt-6 text-center">
              <button onClick={() => setIsLogin(!isLogin)} className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                {isLogin ? 'Need an account? Sign up' : 'Already have an account? Log in'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
