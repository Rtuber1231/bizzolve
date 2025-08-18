// FILE: /pages/auth.js
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

  useEffect(() => {
    if (formData.username.length > 2) {
      const checkUsername = async () => {
        const res = await fetch('/api/auth/check-username', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: formData.username }),
        });
        const data = await res.json();
        setUsernameAvailable(data.available);
      };
      checkUsername();
    } else {
      setUsernameAvailable(null);
    }
  }, [formData.username]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isLogin ? '/api/auth/login' : '/api/auth/signup';
    const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
    });
    const data = await res.json();

    if (res.ok) {
        setToast({ message: data.message, type: 'success' });
        // In a real app, you would redirect here using NextAuth.js
    } else {
        setToast({ message: data.message, type: 'error' });
    }
  };

  return (
    <>
      <Head><title>{isLogin ? 'Login' : 'Sign Up'}</title></Head>
      {toast && <Toast message={toast.message} type={toast.type} onDone={() => setToast(null)} />}
      <div className="container mx-auto px-6 py-12 flex justify-center">
        {/* ... Form structure ... */}
        <form onSubmit={handleSubmit}>
            {/* ... other fields ... */}
            {!isLogin && (
                <div>
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" onChange={handleInputChange} />
                    {usernameAvailable === true && <p className="text-green-500 text-xs">Username is available</p>}
                    {usernameAvailable === false && <p className="text-red-500 text-xs">Username is taken</p>}
                </div>
            )}
            {!isLogin && (
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" onChange={handleInputChange} />
                    <PasswordStrength password={formData.password} />
                </div>
            )}
            {/* ... submit button ... */}
        </form>
      </div>
    </>
  );
}
