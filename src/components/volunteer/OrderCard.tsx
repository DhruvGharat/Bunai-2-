import React from 'react';
import { MapPin, Navigation, Phone, Truck } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { translations, Language } from '../constants/translations';

interface Order {
  id: number;
  productName: string;
  customerName: string;
  customerPhone: string;
  pickupAddress: string;
  dropoffAddress: string;
  distance: string;
  deliveryFee: number;
  amount: number;
  status: string;
  productImage: string;
}

interface OrderCardProps {
  order: Order;
  language: Language;
  onAccept?: (orderId: number) => void;
  onMarkPicked?: (orderId: number) => void;
  onMarkDelivered?: (orderId: number) => void;
  showActions?: boolean;
}

const OrderCard: React.FC<OrderCardProps> = ({
  order,
  language,
  onAccept,
  onMarkPicked,
  onMarkDelivered,
  showActions = true
}) => {
  const t = translations[language];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'accepted':
        return 'bg-blue-100 text-blue-800';
      case 'picked':
        return 'bg-orange-100 text-orange-800';
      case 'delivered':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const renderActions = () => {
    if (!showActions) return null;

    switch (order.status) {
      case 'available':
        return (
          <button
            onClick={() => onAccept?.(order.id)}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-xl transition-colors"
          >
            {t.accept}
          </button>
        );
      case 'accepted':
        return (
          <button
            onClick={() => onMarkPicked?.(order.id)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-xl transition-colors"
          >
            {t.markAsPicked}
          </button>
        );
      case 'picked':
        return (
          <button
            onClick={() => onMarkDelivered?.(order.id)}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-xl transition-colors"
          >
            {t.markAsDelivered}
          </button>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      <div className="flex gap-4 mb-4">
        <ImageWithFallback
          src={order.productImage}
          alt={order.productName}
          className="w-16 h-16 object-cover rounded-xl"
        />
        <div className="flex-1">
          <h3 className="text-lg text-gray-800 mb-1">{order.productName}</h3>
          <p className="text-sm text-gray-600 mb-2">{t.customer}: {order.customerName}</p>
          <div className="flex items-center justify-between">
            <span className="text-xl text-gray-800">₹{order.amount.toLocaleString()}</span>
            <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(order.status)}`}>
              {t[order.status as keyof typeof t] || order.status}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-start gap-2">
          <MapPin className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm text-gray-600">{t.pickup}</p>
            <p className="text-gray-800">{order.pickupAddress}</p>
          </div>
        </div>
        
        <div className="flex items-start gap-2">
          <MapPin className="w-4 h-4 text-red-600 mt-1 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm text-gray-600">{t.dropoff}</p>
            <p className="text-gray-800">{order.dropoffAddress}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4 p-3 bg-gray-50 rounded-xl">
        <div className="flex items-center gap-2">
          <Truck className="w-4 h-4 text-gray-600" />
          <span className="text-sm text-gray-600">{t.distance}: {order.distance}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">{t.deliveryFee}:</span>
          <span className="text-green-600 font-medium">₹{order.deliveryFee}</span>
        </div>
      </div>

      <div className="flex gap-3">
        {renderActions()}
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
          <Navigation className="w-4 h-4" />
          {t.getDirections}
        </button>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
          <Phone className="w-4 h-4" />
          {order.customerPhone}
        </button>
      </div>
    </div>
  );
};

export default OrderCard;