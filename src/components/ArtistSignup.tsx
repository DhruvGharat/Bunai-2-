import React, { useState } from "react";
import { User, ArrowLeft, Eye, EyeOff } from "lucide-react";

interface ArtistSignupProps {
  onBack: () => void;
  onSuccess: () => void;
}

const ArtistSignup: React.FC<ArtistSignupProps> = ({ onBack, onSuccess }) => {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

  const roleColors = "from-yellow-600 to-yellow-500"; // Artist theme

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-100 to-stone-200 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Back to Home */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-yellow-800 hover:text-yellow-700 mb-8 transition-colors"
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
            <h1 className="text-2xl mb-2">Artist Signup</h1>
            <p className="text-white/90 text-sm">Create your account in 4 steps</p>
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                />
                <input
                  type="text"
                  name="contact"
                  placeholder="Contact Number"
                  value={formData.contact}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                />
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                />
                <div className="pt-2">
                  <label className="block text-sm text-gray-700 mb-2">
                    Profile Photo
                  </label>
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={handleInputChange}
                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 
                      file:rounded-full file:border-0 file:text-sm file:font-semibold 
                      file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100"
                  />
                </div>
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                />
                <div className="pt-2">
                  <label className="block text-sm text-gray-700 mb-2">
                    Upload Proof Document
                  </label>
                  <input
                    type="file"
                    name="proofFile"
                    accept="image/*,.pdf"
                    onChange={handleInputChange}
                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 
                      file:rounded-full file:border-0 file:text-sm file:font-semibold 
                      file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100"
                  />
                </div>
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                />
                <input
                  type="text"
                  name="accountNumber"
                  placeholder="Account Number"
                  value={formData.accountNumber}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                />
                <input
                  type="text"
                  name="ifsc"
                  placeholder="IFSC Code"
                  value={formData.ifsc}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                />
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  Set Password
                </h2>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl 
                      focus:ring-2 focus:ring-yellow-500 focus:border-transparent pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>

                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl 
                      focus:ring-2 focus:ring-yellow-500 focus:border-transparent pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="mt-8 flex justify-between">
              <button
                type="button"
                onClick={() => step > 1 && setStep(step - 1)}
                className={`px-6 py-2 rounded-xl ${step === 1
                    ? "invisible"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
              >
                Back
              </button>

              {step < 4 ? (
                <button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  className="px-6 py-2 bg-yellow-600 text-white rounded-xl hover:bg-yellow-700 transition-colors"
                >
                  Next
                </button>
              ) : (
                <button
                  type="button"
                  onClick={onSuccess}
                  className="px-6 py-2 bg-yellow-600 text-white rounded-xl hover:bg-yellow-700 transition-colors"
                >
                  Submit
                </button>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600 text-center">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={onBack}
                  className="text-yellow-700 font-medium hover:underline"
                >
                  Login here
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistSignup;
