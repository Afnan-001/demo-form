import { motion } from 'framer-motion';

interface ProgressBarProps {
  progress: number;
  currentStep: number;
  totalSteps: number;
}

export default function ProgressBar({ progress, currentStep, totalSteps }: ProgressBarProps) {
  return (
    <div className="relative">
      <div className="h-2 bg-gray-200">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 to-blue-600"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        />
      </div>
      <div className="absolute -top-1 right-4 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
        {currentStep} / {totalSteps}
      </div>
    </div>
  );
}
