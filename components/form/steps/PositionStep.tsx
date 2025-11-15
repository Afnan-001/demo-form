'use client';

import { useEffect } from 'react';
import { StepProps } from '@/types/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

export default function PositionStep({ value, onChange, onValidChange }: StepProps) {
  useEffect(() => {
    onValidChange(!!value);
  }, [value, onValidChange]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          What type of position are you looking for?
        </h2>
        <p className="text-sm text-red-600">* Required</p>
      </div>

      <RadioGroup value={value} onValueChange={onChange} className="space-y-4">
        <div className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 transition-colors cursor-pointer">
          <RadioGroupItem value="Part Time" id="part-time" />
          <Label htmlFor="part-time" className="text-lg cursor-pointer flex-1">
            Part Time
          </Label>
        </div>
        <div className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 transition-colors cursor-pointer">
          <RadioGroupItem value="Full-time career change" id="full-time" />
          <Label htmlFor="full-time" className="text-lg cursor-pointer flex-1">
            Full-time career change
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
}
