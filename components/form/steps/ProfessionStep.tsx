'use client';

import { useEffect } from 'react';
import { StepProps } from '@/types/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ProfessionStep({ value, onChange, onValidChange }: StepProps) {
  useEffect(() => {
    onValidChange(!!value && value.trim().length > 0);
  }, [value, onValidChange]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          What is your current full-time profession?
        </h2>
        <p className="text-sm text-red-600">* Required</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="profession" className="text-lg">
          Current Profession
        </Label>
        <Input
          id="profession"
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="e.g., Software Engineer, Teacher, Sales Manager"
          className="h-12 text-lg"
        />
      </div>
    </div>
  );
}
