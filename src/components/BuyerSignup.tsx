import React, { useState } from "react";
import { User, ArrowLeft } from "lucide-react";

interface BuyerSignupProps {
  onBack: () => void;
  onSuccess: () => void;
}

const BuyerSignup: React.FC<BuyerSignupProps> = ({ onBack, onSuccess }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    address: "",
    photo: null as File | null,
    proofType: "",
    proofNumber: "",
    proofFile: null as File | null,
    bankName: "",
    accountNumber: "",
    ifsc: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const roleColors = "from-green-800 to-green-600"; // gradient from login

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-100 to-stone-200 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Back to Home */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-red-900 hover:text-red-700 mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </button>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div
            className={`bg-gradient-to-r ${roleColors} p-8 text-center text-white`}
          >
            <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
              <User className="w-8 h-8" />
            </div>
            <h1 className="text-2xl mb-2">Buyer Signup</h1>
            <p className="text-white/90 text-sm">
              Create your account in 4 steps
            </p>
          </div>

          {/* Form Body */}
          <div className="p-8">
            {step === 1 && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  Personal Information
                </h2>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl"
                />
                <input
                  type="text"
                  name="contact"
                  placeholder="Contact Number"
                  value={formData.contact}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl"
                />
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl"
                />
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={handleInputChange}
                  className="w-full"
                />
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  Verification Proof
                </h2>
                <select
                  name="proofType"
                  value={formData.proofType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl"
                >
                  <option value="">Select Proof Type</option>
                  <option value="aadhar">Aadhar Card</option>
                  <option value="pan">PAN Card</option>
                </select>
                <input
                  type="text"
                  name="proofNumber"
                  placeholder="Proof Number"
                  value={formData.proofNumber}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl"
                />
                <input
                  type="file"
                  name="proofFile"
                  accept="image/*,.pdf"
                  onChange={handleInputChange}
                  className="w-full"
                />
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  Bank Details
                </h2>
                <input
                  type="text"
                  name="bankName"
                  placeholder="Bank Name"
                  value={formData.bankName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl"
                />
                <input
                  type="text"
                  name="accountNumber"
                  placeholder="Account Number"
                  value={formData.accountNumber}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl"
                />
                <input
                  type="text"
                  name="ifsc"
                  placeholder="IFSC Code"
                  value={formData.ifsc}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl"
                />
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  Set Password
                </h2>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl"
                />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl"
                />
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={() => {
                  if (step === 1) {
                    onBack();
                  } else {
                    setStep(step - 1);
                  }
                }}
                className={`w-1/2 mr-2 bg-gradient-to-r ${roleColors} text-white py-3 px-6 rounded-xl hover:shadow-lg transition-all`}
              >
                Back
              </button>

              {step < 4 ? (
                <button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  className={`w-1/2 ml-2 bg-gradient-to-r ${roleColors} text-white py-3 px-6 rounded-xl hover:shadow-lg transition-all`}
                >
                  Next
                </button>
              ) : (
                <button
                  type="button"
                  onClick={onSuccess}
                  className={`w-1/2 ml-2 bg-gradient-to-r ${roleColors} text-white py-3 px-6 rounded-xl hover:shadow-lg transition-all`}
                >
                  Finish Signup
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerSignup;
