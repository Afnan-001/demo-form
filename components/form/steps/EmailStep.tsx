'use client';

import { useEffect, useState } from 'react';
import { StepProps } from '@/types/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function EmailStep({ value, onChange, onValidChange }: StepProps) {
  const [error, setError] = useState('');

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  useEffect(() => {
    const isValid = validateEmail(value || '');
    setError(value && !isValid ? 'Please enter a valid email address' : '');
    onValidChange(isValid);
  }, [value, onValidChange]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          What is your email
        </h2>
        <p className="text-sm text-red-600">* Required</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-lg">
          Email Address
        </Label>
        <Input
          id="email"
          type="email"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="john.doe@example.com"
          className="h-12 text-lg"
        />
        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}
      </div>
    </div>
  );
}
