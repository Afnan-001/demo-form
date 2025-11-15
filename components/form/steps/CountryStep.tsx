'use client';

import { useEffect } from 'react';
import { StepProps } from '@/types/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

export default function CountryStep({ value, onChange, onValidChange }: StepProps) {
  useEffect(() => {
    onValidChange(!!value);
  }, [value, onValidChange]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Which country do you reside in?
        </h2>
        <p className="text-sm text-red-600">* Required</p>
      </div>

      <RadioGroup value={value} onValueChange={onChange} className="space-y-4">
        <div className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 transition-colors cursor-pointer">
          <RadioGroupItem value="USA" id="usa" />
          <Label htmlFor="usa" className="text-lg cursor-pointer flex-1">
            USA
          </Label>
        </div>
        <div className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 transition-colors cursor-pointer">
          <RadioGroupItem value="Canada" id="canada" />
          <Label htmlFor="canada" className="text-lg cursor-pointer flex-1">
            Canada
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
}
