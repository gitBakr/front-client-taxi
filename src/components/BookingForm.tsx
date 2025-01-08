import React, { useState, useEffect } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import { City } from '@/lib/api/types';
import { villeAPI } from '@/lib/api/ville';
import { prixAPI } from '@/lib/api/prix';
import { CitySelect } from './CitySelect';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { DateTimePicker } from './DateTimePicker';
import { useNavigate } from 'react-router-dom';

interface BookingFormProps {
  onSearchComplete?: () => void;
}

// Ajout des interfaces pour typer la réponse
interface EstimationResponse {
  status: 'success' | 'error';
  data: {
    montant: number;
    details: {
      prixBase: number;
      distance: number;
      duree: number;
      supplements: {
        passagers: string;
        climatisation: string;
      };
      villeDepart: string;
      villeArrivee: string;
    };
  };
}

export const BookingForm: React.FC<BookingFormProps> = ({ onSearchComplete }) => {
  // États pour les villes
  const [departQuery, setDepartQuery] = useState('');
  const [arriveeQuery, setArriveeQuery] = useState('');
  const [departSuggestions, setDepartSuggestions] = useState<City[]>([]);
  const [arriveeSuggestions, setArriveeSuggestions] = useState<City[]>([]);
  const [selectedDepartCity, setSelectedDepartCity] = useState<City | null>(null);
  const [selectedArriveCity, setSelectedArriveCity] = useState<City | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isReservationStarted, setIsReservationStarted] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cash' | null>(null);

  // Debounce des recherches
  const debouncedDepartQuery = useDebounce(departQuery, 300);
  const debouncedArriveeQuery = useDebounce(arriveeQuery, 300);

  // État pour l'estimation
  const [estimation, setEstimation] = useState<{
    montant: number;
    details: {
      prixBase: number;
      distance: number;
      duree: number;
      supplements: {
        passagers: string;
        climatisation: string;
      };
      villeDepart: string;
      villeArrivee: string;
    };
  } | null>(null);

  // Ajout des états pour la date et l'heure
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedTime, setSelectedTime] = useState('12:00');

  const navigate = useNavigate();

  const handlePaymentContinue = () => {
    const bookingData = {
      depart: selectedDepartCity,
      arrivee: selectedArriveCity,
      date: selectedDate,
      time: selectedTime,
      estimation: estimation,
    };

    if (paymentMethod === 'card') {
      navigate('/payment/stripe', { state: bookingData });
    } else {
      navigate('/driver/details', { state: bookingData });
    }
  };

  // Fonction d'estimation
  const estimatePrice = async () => {
    if (!selectedDepartCity || !selectedArriveCity) return;

    setLoading(true);
    setError(null);

    try {
      const response = await prixAPI.calculerPrix({
        depart: selectedDepartCity,
        arrivee: selectedArriveCity,
        passagers: 1,
        date: new Date().toISOString().split('T')[0],
        options: []
      });

      console.log('📊 Réponse estimation:', response);

      // Typage de la réponse
      const estimationResponse = response.data as EstimationResponse;

      if (estimationResponse.status === 'success' && estimationResponse.data) {
        const estimationData = estimationResponse.data;
        console.log('📊 Données estimation:', estimationData);

        setEstimation(estimationData);
        onSearchComplete?.();
      } else {
        console.warn('⚠️ Format de réponse incorrect:', response);
        setError('Format de réponse incorrect');
      }
    } catch (error) {
      console.error('❌ Erreur estimation:', error);
      setError('Erreur lors du calcul de l\'estimation');
    } finally {
      setLoading(false);
    }
  };

  // Recherche des villes de départ
  useEffect(() => {
    const searchCities = async () => {
      if (!debouncedDepartQuery || debouncedDepartQuery.length < 2) {
        setDepartSuggestions([]);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const response = await villeAPI.search(debouncedDepartQuery);
        if (response.status === 'success') {
          setDepartSuggestions(response.data);
        }
      } catch (error) {
        console.error('❌ Erreur recherche départ:', error);
        setError('Erreur lors de la recherche des villes');
      } finally {
        setLoading(false);
      }
    };

    searchCities();
  }, [debouncedDepartQuery]);

  // Recherche des villes d'arrivée
  useEffect(() => {
    const searchCities = async () => {
      if (!debouncedArriveeQuery || debouncedArriveeQuery.length < 2) {
        setArriveeSuggestions([]);
        return;
      }

      setError(null);
      try {
        const response = await villeAPI.search(debouncedArriveeQuery);
        if (response.status === 'success') {
          setArriveeSuggestions(response.data);
        }
      } catch (error) {
        console.error('❌ Erreur recherche arrivée:', error);
        setError('Erreur lors de la recherche des villes');
      }
    };

    searchCities();
  }, [debouncedArriveeQuery]);

  // Gestion de la sélection des villes
  const handleCitySelect = (city: City, type: 'depart' | 'arrivee') => {
    setError(null);
    if (type === 'depart') {
      setSelectedDepartCity(city);
      setDepartQuery(city.nom);
      setDepartSuggestions([]);
    } else {
      setSelectedArriveCity(city);
      setArriveeQuery(city.nom);
      setArriveeSuggestions([]);
      if (selectedDepartCity) {
        estimatePrice();
      }
    }
  };

  // Gestion de la soumission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDepartCity || !selectedArriveCity) {
      setError('Veuillez sélectionner les villes de départ et d\'arrivée');
      return;
    }
    await estimatePrice();
  };

  // Fonction utilitaire pour formater la durée
  const formatDuree = (minutes: number) => {
    const heures = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${heures}h${mins.toString().padStart(2, '0')}`;
  };

  // Fonction utilitaire pour arrondir la distance
  const formatDistance = (distance: number) => {
    return Math.round(distance);
  };

  // Ajouter aussi un effet pour réinitialiser quand les requêtes changent
  useEffect(() => {
    setEstimation(null);
  }, [departQuery, arriveeQuery]);

  return (
    <div className="w-full bg-white rounded-xl shadow-lg p-4 sm:p-6 md:p-8">
      <h3 className="text-lg sm:text-xl font-semibold mb-4">Estimation de trajet</h3>
      
      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Ville de départ */}
        <div className="space-y-2">
          <Label>Ville de départ</Label>
          <CitySelect
            id="depart"
            value={departQuery}
            onChange={setDepartQuery}
            onSelect={(city) => handleCitySelect(city, 'depart')}
            suggestions={departSuggestions}
            placeholder="Ville de départ"
            label="Départ"
          />
        </div>

        {/* Ville d'arrivée */}
        <div className="space-y-2">
          <Label>Ville d'arrivée</Label>
          <CitySelect
            id="arrivee"
            value={arriveeQuery}
            onChange={setArriveeQuery}
            onSelect={(city) => handleCitySelect(city, 'arrivee')}
            suggestions={arriveeSuggestions}
            placeholder="Ville d'arrivée"
            label="Destination"
          />
        </div>

        {/* Résultat de l'estimation */}
        {estimation && (
          <div className="mt-4 p-4 bg-blue-50 border border-blue-100 rounded-lg">
            <h4 className="font-medium mb-2 text-blue-900">Estimation</h4>
            <div className="space-y-2 text-sm">
              <p className="text-lg font-semibold text-blue-900">
                Prix total: {estimation.montant}€
              </p>
              <div className="grid grid-cols-2 gap-2 text-blue-800">
                <div>
                  <p className="font-medium">Distance</p>
                  <p>{formatDistance(estimation.details.distance)}km</p>
                </div>
                <div>
                  <p className="font-medium">Durée</p>
                  <p>{formatDuree(estimation.details.duree)}</p>
                </div>
                <div>
                  <p className="font-medium">Prix par km</p>
                  <p>{estimation.details.prixBase}€</p>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-blue-200">
                <p className="font-medium text-blue-900 mb-1">Suppléments</p>
                <div className="grid grid-cols-2 gap-2 text-blue-800">
                  <div>
                    <p className="font-medium">Passagers</p>
                    <p>{estimation.details.supplements.passagers}</p>
                  </div>
                  <div>
                    <p className="font-medium">Climatisation</p>
                    <p>{estimation.details.supplements.climatisation}</p>
                  </div>
                </div>
              </div>
              
              {/* Bouton de réservation */}
              <div className="mt-4 pt-4 border-t border-blue-200">
                <Button 
                  type="button"
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                  onClick={() => {
                    setIsReservationStarted(true);
                    console.log('🎯 Réservation initiée:', {
                      depart: estimation.details.villeDepart,
                      arrivee: estimation.details.villeArrivee,
                      montant: estimation.montant
                    });
                  }}
                >
                  Je réserve
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Bouton de recherche - affiché uniquement si pas d'estimation */}
        {!estimation && (
          <Button 
            type="submit"
            className="w-full"
            disabled={loading || !selectedDepartCity || !selectedArriveCity}
          >
            {loading ? 'Calcul en cours...' : 'Calculer l\'estimation'}
          </Button>
        )}

        {/* Message d'erreur */}
        {error && (
          <div className="p-3 text-sm text-red-600 bg-red-50 rounded-md">
            {error}
          </div>
        )}

        {/* Date et heure du trajet - affiché uniquement après clic sur "Je réserve" */}
        {isReservationStarted && (
          <div className="mt-4 pt-4 border-t border-blue-200">
            <DateTimePicker
              date={selectedDate}
              time={selectedTime}
              onDateChange={setSelectedDate}
              onTimeChange={setSelectedTime}
              label="Date et heure du trajet"
            />

            {/* Choix du mode de paiement */}
            <div className="mt-4 sm:mt-6">
              <Label>Mode de paiement</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                <Button 
                  type="button"
                  variant={paymentMethod === 'card' ? 'default' : 'outline'}
                  className={`flex items-center justify-center space-x-2 p-4 ${
                    paymentMethod === 'card' ? 'bg-green-600 text-white' : ''
                  }`}
                  onClick={() => setPaymentMethod('card')}
                >
                  <span>💳</span>
                  <span>Carte bancaire</span>
                </Button>
                <Button 
                  type="button"
                  variant={paymentMethod === 'cash' ? 'default' : 'outline'}
                  className={`flex items-center justify-center space-x-2 p-4 ${
                    paymentMethod === 'cash' ? 'bg-green-600 text-white' : ''
                  }`}
                  onClick={() => setPaymentMethod('cash')}
                >
                  <span>💵</span>
                  <span>Espèces</span>
                </Button>
              </div>
            </div>

            <Button 
              type="button"
              className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white"
              disabled={!paymentMethod}
              onClick={handlePaymentContinue}
            >
              Continuer
            </Button>
          </div>
        )}
      </form>
    </div>
  );
};