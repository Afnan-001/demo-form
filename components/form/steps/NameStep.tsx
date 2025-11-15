'use client';

import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface NameStepProps {
  firstName: string;
  lastName: string;
  onFirstNameChange: (value: string) => void;
  onLastNameChange: (value: string) => void;
  onValidChange: (valid: boolean) => void;
}

export default function NameStep({
  firstName,
  lastName,
  onFirstNameChange,
  onLastNameChange,
  onValidChange,
}: NameStepProps) {
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');

  const validateName = (name: string): boolean => {
    return /^[A-Za-z\s]+$/.test(name) && name.trim().length > 0;
  };

  useEffect(() => {
    const firstValid = validateName(firstName);
    const lastValid = validateName(lastName);

    setFirstNameError(firstName && !firstValid ? 'Only alphabets allowed' : '');
    setLastNameError(lastName && !lastValid ? 'Only alphabets allowed' : '');

    onValidChange(firstValid && lastValid);
  }, [firstName, lastName, onValidChange]);

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^[A-Za-z\s]*$/.test(value)) {
      onFirstNameChange(value);
    }
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^[A-Za-z\s]*$/.test(value)) {
      onLastNameChange(value);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Please tell us your full name
        </h2>
        <p className="text-sm text-red-600">* Required</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="firstName" className="text-lg">
            First Name
          </Label>
          <Input
            id="firstName"
            type="text"
            value={firstName}
            onChange={handleFirstNameChange}
            placeholder="John"
            className="h-12 text-lg"
          />
          {firstNameError && (
            <p className="text-sm text-red-600">{firstNameError}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName" className="text-lg">
            Last Name
          </Label>
          <Input
            id="lastName"
            type="text"
            value={lastName}
            onChange={handleLastNameChange}
            placeholder="Doe"
            className="h-12 text-lg"
          />
          {lastNameError && (
            <p className="text-sm text-red-600">{lastNameError}</p>
          )}
        </div>
      </div>
    </div>
  );
}
