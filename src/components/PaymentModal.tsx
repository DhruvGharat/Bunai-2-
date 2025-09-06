import React, { useState } from 'react';
import { toast } from 'sonner';
import { CreditCard, Award, Wallet } from 'lucide-react';

interface PaymentModalProps {
  show: boolean;
  onClose: () => void;
  amount: number;
  productName?: string;
  address: string;
  sellerLocation?: string; // Add seller location prop
  onSuccess?: () => void;
}


// Function to calculate distance (mock implementation - in a real app, you'd use a mapping service)
const calculateDistance = (location1: string, location2: string): number => {
  // This is a mock implementation
  // In a real app, you would use a geocoding service to get coordinates
  // and then calculate the distance between them
  const distanceMap: Record<string, number> = {
    'Mumbai': 0,
    'Delhi': 1400,
    'Bangalore': 1000,
    'Hyderabad': 700,
    'Chennai': 1300,
    'Kolkata': 1600,
    'Pune': 150,
    'Ahmedabad': 500,
    'Jaipur': 1100,
    'Lucknow': 1300,
    'Bihar': 1800,
    'Uttar Pradesh': 1200,
  };
  
  const loc1 = location1.toLowerCase();
  const loc2 = location2.toLowerCase();
  
  // If locations are the same, return a minimum distance of 5km
  if (loc1 === loc2) return 5;
  
  // Get distances from Mumbai (as an example)
  const dist1 = distanceMap[location1] || 100;
  const dist2 = distanceMap[location2] || 100;
  
  // Return the absolute difference as distance
  return Math.max(5, Math.abs(dist1 - dist2) / 10); // Divide by 10 to get reasonable km values
};

export const PaymentModal: React.FC<PaymentModalProps> = ({ show, onClose, amount, productName, address: initialAddress, sellerLocation = 'Mumbai', onSuccess }) => {
  const [step, setStep] = useState(1); // 1: Address, 2: Summary, 3: Payment
  const [address, setAddress] = useState(initialAddress || '');
  const [editAddress, setEditAddress] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');

  if (!show) return null;

  // Address Step
  const renderAddressStep = () => (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold text-red-900 mb-2">Delivery Address</h2>
      {editAddress ? (
        <div className="flex flex-col gap-2">
          <textarea
            className="border rounded-xl p-3 w-full"
            rows={3}
            value={address}
            onChange={e => setAddress(e.target.value)}
          />
          <div className="flex gap-2">
            <button className="bg-green-700 text-white px-4 py-2 rounded-xl" onClick={() => setEditAddress(false)}>Save</button>
            <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-xl" onClick={() => setEditAddress(false)}>Cancel</button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <div className="text-gray-800 text-lg">{address}</div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-xl w-fit" onClick={() => setEditAddress(true)}>Edit Address</button>
        </div>
      )}
      <div className="flex gap-2 mt-6">
        <button className="bg-blue-600 text-white px-6 py-2 rounded-xl font-bold flex-1" onClick={() => setStep(2)}>Next</button>
        <button className="bg-gray-200 text-gray-700 px-6 py-2 rounded-xl font-bold flex-1" onClick={onClose}>Cancel</button>
      </div>
    </div>
  );

  // Summary Step
  const renderSummaryStep = () => {
    const subtotal = amount;
    const platformFee = Math.round(subtotal * 0.02); // 2% platform fee
    
    // Calculate delivery fee based on distance (₹11 per km)
    const distance = calculateDistance(sellerLocation, address);
    const deliveryFee = Math.round(distance * 11); // ₹11 per km
    const minDeliveryFee = 55; // Minimum delivery fee of ₹55 (for distances < 5km)
    const finalDeliveryFee = Math.max(deliveryFee, minDeliveryFee);
    
    const total = subtotal + platformFee + finalDeliveryFee;

    return (
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-red-900 mb-2">Order Summary</h2>
        <div className="text-gray-800 text-lg">{productName ? `Product: ${productName}` : 'Cart Order'}</div>
        <div className="text-gray-800">Delivery Address: {address}</div>
        
        <div className="space-y-3 mb-4">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹{subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Platform Fee</span>
            <span>₹{platformFee.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Delivery Fee ({distance.toFixed(1)} km × ₹11/km)</span>
            <span>₹{finalDeliveryFee.toLocaleString()}</span>
          </div>
          <hr />
          <div className="flex justify-between text-lg">
            <span>Total</span>
            <span>₹{total.toLocaleString()}</span>
          </div>
        </div>
        
        <div className="flex gap-2 mt-6">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-xl font-bold flex-1" onClick={() => setStep(3)}>Proceed to Payment</button>
          <button className="bg-gray-200 text-gray-700 px-6 py-2 rounded-xl font-bold flex-1" onClick={() => setStep(1)}>Back</button>
        </div>
      </div>
    );
  };

  // Payment Step (existing UI)
  const renderPaymentStep = () => (
    <div className="flex flex-col gap-6">
      <h2 className="text-3xl font-bold text-red-900 mb-2 flex items-center gap-2">
        <CreditCard className="w-7 h-7 text-red-700" /> Payment
      </h2>
      <div className="w-full border-b border-gray-200 mb-2" />
      <div className="flex flex-col gap-2">
        <label className="font-medium text-gray-700 mb-1">Select Payment Method</label>
        <div className="flex gap-3">
          <button type="button" className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition ${paymentMethod==='card'?'bg-blue-50 border-blue-600':'bg-gray-50 border-gray-300'}`} onClick={()=>setPaymentMethod('card')}>
            <CreditCard className="w-5 h-5 text-blue-600" /> Card
          </button>
          <button type="button" className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition ${paymentMethod==='upi'?'bg-green-50 border-green-600':'bg-gray-50 border-gray-300'}`} onClick={()=>setPaymentMethod('upi')}>
            <Award className="w-5 h-5 text-green-600" /> UPI
          </button>
          <button type="button" className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition ${paymentMethod==='wallet'?'bg-purple-50 border-purple-600':'bg-gray-50 border-gray-300'}`} onClick={()=>setPaymentMethod('wallet')}>
            <Wallet className="w-5 h-5 text-purple-600" /> Wallet
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-3 mt-2">
        {paymentMethod === 'card' && (
          <div className="flex flex-col gap-2">
            <label className="font-medium text-gray-700">Card Details</label>
            <input type="text" className="border rounded px-3 py-2 w-full" placeholder="Card Number" />
            <div className="flex gap-2">
              <input type="text" className="border rounded px-3 py-2 w-1/2" placeholder="Expiry (MM/YY)" />
              <input type="text" className="border rounded px-3 py-2 w-1/2" placeholder="CVV" />
            </div>
            <input type="text" className="border rounded px-3 py-2 w-full" placeholder="Name on Card" />
          </div>
        )}
        {paymentMethod === 'upi' && (
          <div className="flex flex-col gap-2">
            <label className="font-medium text-gray-700">UPI ID</label>
            <input type="text" className="border rounded px-3 py-2 w-full" placeholder="e.g. user@bank" />
          </div>
        )}
        {paymentMethod === 'wallet' && (
          <div className="flex flex-col gap-2">
            <label className="font-medium text-gray-700">Wallet Name</label>
            <input type="text" className="border rounded px-3 py-2 w-full" placeholder="e.g. Paytm, PhonePe" />
          </div>
        )}
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <div className="text-lg font-bold text-gray-900">Total: ₹{amount}</div>
        {productName && <div className="text-sm text-gray-500">Product: {productName}</div>}
        <div className="text-sm text-gray-500">Delivery Address: {address}</div>
      </div>
      <div className="flex flex-col gap-2 mt-6">
        <button
          className="py-2 px-6 rounded-xl font-bold shadow-lg w-full mb-2"
          style={{ background: '#22c55e', color: '#fff', fontWeight: 700, fontSize: '1rem', border: 'none' }}
          onClick={() => {
            onClose();
            if (onSuccess) onSuccess();
            toast.success('Order placed successfully!', { position: 'top-center' });
          }}
        >
          Proceed Payment
        </button>
        <button
          className="bg-gray-200 text-gray-700 py-2 px-6 rounded-xl font-bold shadow mt-2 w-full"
          onClick={() => setStep(2)}
        >Back</button>
        <button
          className="bg-gray-200 text-gray-700 py-2 px-6 rounded-xl font-bold shadow mt-2 w-full"
          onClick={onClose}
        >Cancel</button>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-6">
      <div className="bg-white border border-gray-200 rounded-3xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative z-50 flex flex-col gap-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-gray-100 hover:bg-gray-200 rounded-full shadow"
          aria-label="Close"
        >
          X
        </button>
        {/* Stepper UI */}
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${step===1?'bg-blue-600':'bg-gray-400'}`}>1</div>
          <div className={`h-1 w-8 ${step>1?'bg-blue-600':'bg-gray-300'}`}></div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${step===2?'bg-blue-600':step>2?'bg-blue-600':'bg-gray-400'}`}>2</div>
          <div className={`h-1 w-8 ${step>2?'bg-blue-600':'bg-gray-300'}`}></div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${step===3?'bg-blue-600':'bg-gray-400'}`}>3</div>
        </div>
        {/* Step Content */}
        {step === 1 && renderAddressStep()}
        {step === 2 && renderSummaryStep()}
        {step === 3 && renderPaymentStep()}
      </div>
    </div>
  );
};
