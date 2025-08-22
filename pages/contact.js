// FILE: /pages/contact.js
// DESC: A functional contact page with a form.

import React, { useState } from 'react';
import Head from 'next/head';
import Toast from '../components/Toast';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [toast, setToast] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (res.ok) {
        setToast({ message: 'Message sent successfully!', type: 'success' });
        setFormData({ name: '', email: '', phone: '', message: '' }); // Clear form
      } else {
        setToast({ message: data.message || 'Failed to send message.', type: 'error' });
      }
    } catch (error) {
      setToast({ message: 'An error occurred. Please try again.', type: 'error' });
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Contact Us - BizSolve</title>
      </Head>
      {toast && <Toast message={toast.message} type={toast.type} onDone={() => setToast(null)} />}
      <div className="container mx-auto px-6 py-12 fade-in">
        <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold">Get in Touch</h1>
            <p className="text-brand-secondary dark:text-gray-400 mt-2">
                Have a question or a proposal? We'd love to hear from you.
            </p>
            <p className="mt-4">
                You can reach us directly at <a href="mailto:contact@bizsolve.com" className="font-semibold text-brand-signature hover:underline">contact@bizsolve.com</a> or use the form below.
            </p>
        </div>

        <div className="mt-12 max-w-xl mx-auto">
            <div className="bg-white dark:bg-gray-800/70 border border-gray-200 dark:border-gray-700 rounded-xl p-8 shadow-sm">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                        <input type="text" name="name" id="name" value={formData.name} onChange={handleInputChange} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm" />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                        <input type="email" name="email" id="email" value={formData.email} onChange={handleInputChange} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm" />
                    </div>
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number (Optional)</label>
                        <input type="tel" name="phone" id="phone" value={formData.phone} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm" />
                    </div>
                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Your Message</label>
                        <textarea name="message" id="message" rows="5" value={formData.message} onChange={handleInputChange} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm"></textarea>
                    </div>
                    <div>
                        <button type="submit" disabled={isLoading} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-signature hover:opacity-90 disabled:opacity-50">
                            {isLoading ? 'Sending...' : 'Send Message'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
      </div>
    </>
  );
}
