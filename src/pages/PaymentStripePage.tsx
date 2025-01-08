import React from 'react';
import { Button } from '@/components/ui/button';
import { useLocation, useNavigate } from 'react-router-dom';

export const PaymentStripePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const bookingData = location.state;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto mb-4">
        <Button
          variant="outline"
          className="flex items-center space-x-2 hover:bg-green-50"
          onClick={() => navigate(-1)}
        >
          <span>←</span>
          <span>Retour</span>
        </Button>
      </div>

      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Paiement sécurisé</h2>
          <p className="mt-2 text-gray-600">Via Stripe</p>
        </div>

        <div className="space-y-6">
          {/* Informations de la carte */}
          <div className="bg-gray-50 p-4 rounded-md border">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Numéro de carte
                </label>
                <input
                  type="text"
                  placeholder="4242 4242 4242 4242"
                  className="mt-1 block w-full p-3 border rounded-md"
                  disabled
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Date d'expiration
                  </label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="mt-1 block w-full p-3 border rounded-md"
                    disabled
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    CVC
                  </label>
                  <input
                    type="text"
                    placeholder="123"
                    className="mt-1 block w-full p-3 border rounded-md"
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Récapitulatif */}
          <div className="bg-blue-50 p-4 rounded-md">
            <h3 className="font-medium text-blue-900 mb-2">Récapitulatif</h3>
            <div className="space-y-2 text-sm text-blue-800">
              <div className="flex justify-between">
                <span>Trajet</span>
                <span>Tunis → Sousse</span>
              </div>
              <div className="flex justify-between">
                <span>Date</span>
                <span>12 Jan 2024, 14:30</span>
              </div>
              <div className="flex justify-between font-medium text-base pt-2 border-t">
                <span>Total</span>
                <span>145.00€</span>
              </div>
            </div>
          </div>

          <Button 
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3"
            onClick={() => window.location.href = '/driver/details'}
          >
            Payer 145.00€
          </Button>

          <div className="text-center text-sm text-gray-500">
            <p>Paiement sécurisé via Stripe</p>
            <p className="mt-1">🔒 Vos données sont chiffrées</p>
          </div>
        </div>
      </div>
    </div>
  );
}; 