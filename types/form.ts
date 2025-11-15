export interface FormData {
  country: string;
  province: string;
  workAuth: string;
  firstName: string;
  lastName: string;
  areaCode: string;
  phoneNumber: string;
  email: string;
  profession: string;
  positionType: string;
  commissionBased: string;
  licensing: string;
}

export interface StepProps {
  value?: string;
  onChange: (value: string) => void;
  onValidChange: (valid: boolean) => void;
}
