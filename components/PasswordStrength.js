// FILE: /components/PasswordStrength.js
import React from 'react';

export default function PasswordStrength({ password }) {
  const checkStrength = () => {
    let score = 0;
    if (!password || password.length < 8) return 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  };

  const strength = checkStrength();
  const color = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500'][strength - 1] || 'bg-gray-200 dark:bg-gray-700';
  const width = `${(strength / 4) * 100}%`;

  return (
    <div className="mt-2">
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
        <div className={`h-1.5 rounded-full transition-all duration-300 ${color}`} style={{ width }}></div>
      </div>
      <p className="text-xs text-brand-secondary dark:text-gray-400 mt-1">
        {['Very Weak', 'Fair', 'Good', 'Strong'][strength - 1] || 'Password strength'}
      </p>
    </div>
  );
}
