import React from 'react';
import { Button } from '@/components/ui/button';
import { useLocation, useNavigate } from 'react-router-dom';

export const DriverDetailsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const bookingData = location.state;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Bouton retour */}
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

      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        {/* En-tête avec photo du chauffeur */}
        <div className="relative h-48 bg-blue-600">
          <div className="absolute -bottom-16 left-1/2 -translate-x-1/2">
            <div className="w-32 h-32 rounded-full border-4 border-white bg-gray-200 flex items-center justify-center">
              <span className="text-4xl">🚕</span>
            </div>
          </div>
        </div>

        {/* Informations du chauffeur */}
        <div className="pt-20 pb-8 px-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Mohamed Ben Ali</h2>
            <p className="text-gray-600">⭐️ 4.9 (523 courses)</p>
          </div>

          {/* Détails de la course */}
          <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-md">
              <h3 className="font-medium text-blue-900 mb-3">Détails de la course</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center text-blue-800">
                  <span className="w-20">Départ</span>
                  <span className="font-medium">Tunis</span>
                </div>
                <div className="flex items-center text-blue-800">
                  <span className="w-20">Arrivée</span>
                  <span className="font-medium">Sousse</span>
                </div>
                <div className="flex items-center text-blue-800">
                  <span className="w-20">Heure</span>
                  <span className="font-medium">14:30</span>
                </div>
                <div className="flex items-center text-blue-800">
                  <span className="w-20">Véhicule</span>
                  <span className="font-medium">Mercedes Classe E</span>
                </div>
                <div className="flex items-center text-blue-800">
                  <span className="w-20">Montant</span>
                  <span className="font-medium">145.00€</span>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="grid grid-cols-2 gap-4">
              <Button 
                variant="outline"
                className="flex items-center justify-center space-x-2 hover:bg-green-50"
                onClick={() => window.location.href = 'tel:+21612345678'}
              >
                <span>📞</span>
                <span>Appeler</span>
              </Button>
              <Button 
                variant="outline"
                className="flex items-center justify-center space-x-2 hover:bg-green-50"
                onClick={() => window.location.href = 'sms:+21612345678'}
              >
                <span>💬</span>
                <span>Message</span>
              </Button>
            </div>

            {/* Instructions */}
            <div className="bg-green-50 p-4 rounded-md text-green-800">
              <p className="text-sm">
                Le chauffeur vous attendra à l'adresse indiquée. 
                Vous pouvez le contacter directement en cas de besoin.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 