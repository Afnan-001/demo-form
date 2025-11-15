'use client';

import { useEffect } from 'react';
import { StepProps } from '@/types/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function WorkAuthStep({ value, onChange, onValidChange }: StepProps) {
  useEffect(() => {
    onValidChange(value === 'Yes');
  }, [value, onValidChange]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Work Authorization
        </h2>
        <p className="text-gray-700 mb-2">
          Do you have Citizenship, Permanent Residence or an Open Work Permit to work in Canada?
        </p>
        <p className="text-sm text-gray-600 mb-2">
          Unfortunately study permits & co-op work permits cannot proceed. Do not proceed if answer is NO.
        </p>
        <p className="text-sm text-red-600">* Required</p>
      </div>

      <RadioGroup value={value} onValueChange={onChange} className="space-y-4">
        <div className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 transition-colors cursor-pointer">
          <RadioGroupItem value="Yes" id="auth-yes" />
          <Label htmlFor="auth-yes" className="text-lg cursor-pointer flex-1">
            Yes
          </Label>
        </div>
        <div className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-lg hover:border-red-500 transition-colors cursor-pointer">
          <RadioGroupItem value="No" id="auth-no" />
          <Label htmlFor="auth-no" className="text-lg cursor-pointer flex-1">
            No
          </Label>
        </div>
      </RadioGroup>

      {value === 'No' && (
        <Alert variant="destructive" className="mt-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            You cannot proceed further. Unfortunately, you do not meet the work authorization requirements.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
