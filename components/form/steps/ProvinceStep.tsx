'use client';

import { useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

const US_STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut',
  'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
  'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan',
  'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
  'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio',
  'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
  'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia',
  'Wisconsin', 'Wyoming'
];

const CANADIAN_PROVINCES = [
  'Alberta', 'British Columbia', 'Manitoba', 'New Brunswick', 'Newfoundland and Labrador',
  'Nova Scotia', 'Ontario', 'Prince Edward Island', 'Quebec', 'Saskatchewan',
  'Northwest Territories', 'Nunavut', 'Yukon'
];

interface ProvinceStepProps {
  country: string;
  value: string;
  onChange: (value: string) => void;
  onValidChange: (valid: boolean) => void;
}

export default function ProvinceStep({ country, value, onChange, onValidChange }: ProvinceStepProps) {
  const locations = country === 'USA' ? US_STATES : CANADIAN_PROVINCES;
  const label = country === 'USA' ? 'State' : 'Province';

  useEffect(() => {
    onValidChange(!!value);
  }, [value, onValidChange]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          What {label.toLowerCase()} do you reside in?
        </h2>
        <p className="text-sm text-red-600">* Required</p>
      </div>

      <div className="space-y-3">
        <Label htmlFor="province" className="text-lg">
          Select your {label.toLowerCase()}
        </Label>
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger id="province" className="w-full h-12 text-lg">
            <SelectValue placeholder={`Choose ${label}...`} />
          </SelectTrigger>
          <SelectContent>
            {locations.map((location) => (
              <SelectItem key={location} value={location}>
                {location}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
