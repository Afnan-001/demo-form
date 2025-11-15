'use client';

import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface PhoneStepProps {
  areaCode: string;
  phoneNumber: string;
  onAreaCodeChange: (value: string) => void;
  onPhoneNumberChange: (value: string) => void;
  onValidChange: (valid: boolean) => void;
}

export default function PhoneStep({
  areaCode,
  phoneNumber,
  onAreaCodeChange,
  onPhoneNumberChange,
  onValidChange,
}: PhoneStepProps) {
  const [areaCodeError, setAreaCodeError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  useEffect(() => {
    const areaCodeValid = /^\d{3}$/.test(areaCode);
    const phoneValid = /^\d{7}$/.test(phoneNumber);

    setAreaCodeError(areaCode && !areaCodeValid ? 'Must be 3 digits' : '');
    setPhoneError(phoneNumber && !phoneValid ? 'Must be 7 digits' : '');

    onValidChange(areaCodeValid && phoneValid);
  }, [areaCode, phoneNumber, onValidChange]);

  const handleAreaCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d{0,3}$/.test(value)) {
      onAreaCodeChange(value);
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d{0,7}$/.test(value)) {
      onPhoneNumberChange(value);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          What is your Phone Number
        </h2>
        <p className="text-sm text-red-600">* Required</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="areaCode" className="text-lg">
            Area Code
          </Label>
          <Input
            id="areaCode"
            type="text"
            inputMode="numeric"
            value={areaCode}
            onChange={handleAreaCodeChange}
            placeholder="555"
            maxLength={3}
            className="h-12 text-lg"
          />
          {areaCodeError && (
            <p className="text-sm text-red-600">{areaCodeError}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phoneNumber" className="text-lg">
            Phone Number
          </Label>
          <Input
            id="phoneNumber"
            type="text"
            inputMode="numeric"
            value={phoneNumber}
            onChange={handlePhoneChange}
            placeholder="1234567"
            maxLength={7}
            className="h-12 text-lg"
          />
          {phoneError && (
            <p className="text-sm text-red-600">{phoneError}</p>
          )}
        </div>
      </div>
    </div>
  );
}
