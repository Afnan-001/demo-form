import { motion } from 'framer-motion';
import { CheckCircle2, Mail, Phone, MapPin } from 'lucide-react';
import { FormData } from '@/types/form';

interface SuccessPageProps {
  formData: FormData;
}

export default function SuccessPage({ formData }: SuccessPageProps) {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full"
      >
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-green-500 to-green-600 p-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            >
              <CheckCircle2 className="w-20 h-20 text-white mx-auto mb-4" />
            </motion.div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Application Submitted Successfully!
            </h1>
            <p className="text-green-50">
              Thank you for your interest. We'll be in touch soon!
            </p>
          </div>

          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Your Information
            </h2>

            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                <MapPin className="w-5 h-5 text-blue-600 mt-1" />
                <div>
                  <p className="font-semibold text-gray-900">Location</p>
                  <p className="text-gray-700">{formData.province}, {formData.country}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                <div className="w-5 h-5 flex items-center justify-center bg-blue-600 text-white rounded-full text-xs font-bold mt-1">
                  {formData.firstName.charAt(0)}{formData.lastName.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Name</p>
                  <p className="text-gray-700">{formData.firstName} {formData.lastName}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                <Phone className="w-5 h-5 text-blue-600 mt-1" />
                <div>
                  <p className="font-semibold text-gray-900">Phone</p>
                  <p className="text-gray-700">({formData.areaCode}) {formData.phoneNumber}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                <Mail className="w-5 h-5 text-blue-600 mt-1" />
                <div>
                  <p className="font-semibold text-gray-900">Email</p>
                  <p className="text-gray-700">{formData.email}</p>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="font-semibold text-gray-900 mb-2">Position Details</p>
                <div className="space-y-1 text-sm text-gray-700">
                  <p><span className="font-medium">Current Profession:</span> {formData.profession}</p>
                  <p><span className="font-medium">Position Type:</span> {formData.positionType}</p>
                  <p><span className="font-medium">Commission-Based Income:</span> {formData.commissionBased}</p>
                  <p><span className="font-medium">Licensing:</span> {formData.licensing}</p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">What's Next?</h3>
              <p className="text-blue-800 text-sm">
                Our team will review your application and reach out to you within 2-3 business
                days to discuss the next steps in the process.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
