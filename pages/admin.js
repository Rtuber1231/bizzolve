// FILE: /pages/admin.js
// DESC: A placeholder for the admin dashboard.

import React from 'react';
import Head from 'next/head';

export default function AdminPage() {
  return (
    <>
      <Head>
        <title>Admin - BizSolve</title>
      </Head>
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold">Admin Dashboard</h1>
        <p className="text-brand-secondary mt-1">This page should be protected and only accessible to administrators.</p>
      </div>
    </>
  );
}
