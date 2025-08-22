// FILE: /pages/auth.js
// DESC: Fully functional signup and login page connected to the backend API and session context.

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import PasswordStrength from '../components/PasswordStrength';
import Toast from '../components/Toast';
import { useSession } from '../context/SessionContext'; // Import the session hook

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', username: '', password: '', role: 'STUDENT' });
  const [usernameAvailable, setUsernameAvailable] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const router = useRouter();
  const { login } = useSession(); // Get the login function from context

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleRoleChange = (role) => {
    setFormData({ ...formData, role });
  };

  // ... (useEffect for username check remains the same)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setToast(null);

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
            login(data.user); // Set the user in the global session state
            setTimeout(() => {
                router.push(data.user.role === 'STUDENT' ? '/profile' : '/enterprise');
            }, 1000);
        } else {
            setToast({ message: data.message, type: 'error' });
        }
    } catch (error) {
        setToast({ message: "An error occurred. Please try again.", type: 'error' });
    } finally {
        setIsLoading(false);
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
              {/* Form fields remain the same */}
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
