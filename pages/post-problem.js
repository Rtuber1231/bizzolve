// FILE: /pages/post-problem.js
import React, { useState } from 'react';
import Head from 'next/head';
import Toast from '../components/Toast';

export default function PostProblemPage() {
    const [formData, setFormData] = useState({ title: '', description: '', points: '', tags: '' });
    const [toast, setToast] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch('/api/challenges/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });
        const data = await res.json();

        if (res.ok) {
            setToast({ message: 'Problem posted successfully!', type: 'success' });
            setFormData({ title: '', description: '', points: '', tags: '' });
        } else {
            setToast({ message: data.message, type: 'error' });
        }
    };

    // ... form JSX with onChange handlers ...

    return (
        <>
            <Head><title>Post a Problem</title></Head>
            {toast && <Toast message={toast.message} type={toast.type} onDone={() => setToast(null)} />}
            <div className="container mx-auto px-6 py-12">
                {/* ... form structure ... */}
                <form onSubmit={handleSubmit}>
                    {/* ... form fields ... */}
                </form>
            </div>
        </>
    );
}
