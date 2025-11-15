'use client';

import { useEffect } from 'react';
import { StepProps } from '@/types/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

export default function LicensingStep({ value, onChange, onValidChange }: StepProps) {
  useEffect(() => {
    onValidChange(!!value);
  }, [value, onValidChange]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Licensing Requirement
        </h2>
        <p className="text-gray-700 mb-2">
          This profession is highly regulated & requires you to obtain a government license
          from the state/province of your residence. Are you open to learning & acquiring
          the necessary government licenses required to work in this regulated profession?
        </p>
        <p className="text-sm text-red-600">* Required</p>
      </div>

      <RadioGroup value={value} onValueChange={onChange} className="space-y-4">
        <div className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 transition-colors cursor-pointer">
          <RadioGroupItem value="Yes" id="licensing-yes" />
          <Label htmlFor="licensing-yes" className="text-lg cursor-pointer flex-1">
            Yes
          </Label>
        </div>
        <div className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 transition-colors cursor-pointer">
          <RadioGroupItem value="No" id="licensing-no" />
          <Label htmlFor="licensing-no" className="text-lg cursor-pointer flex-1">
            No
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
}
