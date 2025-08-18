// FILE: /components/Toast.js
import React, { useEffect } from 'react';

export default function Toast({ message, type, onDone }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDone();
    }, 2000); // Notification disappears after 2 seconds

    return () => clearTimeout(timer);
  }, [onDone]);

  const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';

  return (
    <div className={`fixed bottom-10 right-10 px-6 py-3 rounded-lg text-white ${bgColor} shadow-lg fade-in z-50`}>
      {message}
    </div>
  );
}
