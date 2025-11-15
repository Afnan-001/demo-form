'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProgressBar from '@/components/form/ProgressBar';
import FormHeader from '@/components/form/FormHeader';
import CountryStep from '@/components/form/steps/CountryStep';
import ProvinceStep from '@/components/form/steps/ProvinceStep';
import WorkAuthStep from '@/components/form/steps/WorkAuthStep';
import NameStep from '@/components/form/steps/NameStep';
import PhoneStep from '@/components/form/steps/PhoneStep';
import EmailStep from '@/components/form/steps/EmailStep';
import ProfessionStep from '@/components/form/steps/ProfessionStep';
import PositionStep from '@/components/form/steps/PositionStep';
import CommissionStep from '@/components/form/steps/CommissionStep';
import LicensingStep from '@/components/form/steps/LicensingStep';
import SuccessPage from '@/components/form/SuccessPage';
import { FormData } from '@/types/form';

const TOTAL_STEPS = 10;

export default function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    country: '',
    province: '',
    workAuth: '',
    firstName: '',
    lastName: '',
    areaCode: '',
    phoneNumber: '',
    email: '',
    profession: '',
    positionType: '',
    commissionBased: '',
    licensing: '',
  });
  const [stepValid, setStepValid] = useState(false);

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (stepValid && currentStep < TOTAL_STEPS) {
      setCurrentStep((prev) => prev + 1);
      setStepValid(false);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      setStepValid(true);
    }
  };

  const handleSubmit = async () => {
    if (stepValid) {
      try {
        await fetch('/api/responses', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
      } catch (err) {
        console.error('Failed to submit response', err);
      }

      setIsSubmitted(true);
    }
  };

  const progress = (currentStep / TOTAL_STEPS) * 100;

  if (isSubmitted) {
    return <SuccessPage formData={formData} />;
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <FormHeader />

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mt-8">
          <ProgressBar progress={progress} currentStep={currentStep} totalSteps={TOTAL_STEPS} />

          <div className="p-8 sm:p-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {currentStep === 1 && (
                  <CountryStep
                    value={formData.country}
                    onChange={(value) => updateFormData('country', value)}
                    onValidChange={setStepValid}
                  />
                )}
                {currentStep === 2 && (
                  <ProvinceStep
                    country={formData.country}
                    value={formData.province}
                    onChange={(value) => updateFormData('province', value)}
                    onValidChange={setStepValid}
                  />
                )}
                {currentStep === 3 && (
                  <WorkAuthStep
                    value={formData.workAuth}
                    onChange={(value) => updateFormData('workAuth', value)}
                    onValidChange={setStepValid}
                  />
                )}
                {currentStep === 4 && (
                  <NameStep
                    firstName={formData.firstName}
                    lastName={formData.lastName}
                    onFirstNameChange={(value) => updateFormData('firstName', value)}
                    onLastNameChange={(value) => updateFormData('lastName', value)}
                    onValidChange={setStepValid}
                  />
                )}
                {currentStep === 5 && (
                  <PhoneStep
                    areaCode={formData.areaCode}
                    phoneNumber={formData.phoneNumber}
                    onAreaCodeChange={(value) => updateFormData('areaCode', value)}
                    onPhoneNumberChange={(value) => updateFormData('phoneNumber', value)}
                    onValidChange={setStepValid}
                  />
                )}
                {currentStep === 6 && (
                  <EmailStep
                    value={formData.email}
                    onChange={(value) => updateFormData('email', value)}
                    onValidChange={setStepValid}
                  />
                )}
                {currentStep === 7 && (
                  <ProfessionStep
                    value={formData.profession}
                    onChange={(value) => updateFormData('profession', value)}
                    onValidChange={setStepValid}
                  />
                )}
                {currentStep === 8 && (
                  <PositionStep
                    value={formData.positionType}
                    onChange={(value) => updateFormData('positionType', value)}
                    onValidChange={setStepValid}
                  />
                )}
                {currentStep === 9 && (
                  <CommissionStep
                    value={formData.commissionBased}
                    onChange={(value) => updateFormData('commissionBased', value)}
                    onValidChange={setStepValid}
                  />
                )}
                {currentStep === 10 && (
                  <LicensingStep
                    value={formData.licensing}
                    onChange={(value) => updateFormData('licensing', value)}
                    onValidChange={setStepValid}
                  />
                )}
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-between mt-8 pt-8 border-t border-gray-200">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 1}
                className="px-6 py-2 disabled:opacity-0"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>

              {currentStep < TOTAL_STEPS ? (
                <Button
                  onClick={handleNext}
                  disabled={!stepValid}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={!stepValid}
                  className="px-8 py-2 bg-green-600 hover:bg-green-700 text-white disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Submit
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
