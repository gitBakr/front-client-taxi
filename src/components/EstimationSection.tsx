import { Button } from "@/components/ui/button";
import { EstimationState, City } from "@/lib/api";
import { SearchingDriverAnimation } from './SearchingDriverAnimation';

interface EstimationSectionProps {
  estimation: EstimationState;
  prixParKm: number;
  searchingDriver: boolean;
  searchStep: number;
  searchMessages: string[];
  selectedDepartCity: City | null;
  selectedArriveeCity: City | null;
  onConfirm: () => void;
  onSearchStart: () => void;
}

export const EstimationSection = ({
  estimation,
  prixParKm,
  searchingDriver,
  searchStep,
  searchMessages,
  selectedDepartCity,
  selectedArriveeCity,
  onConfirm,
  onSearchStart
}: EstimationSectionProps) => {
  return (
    <div className="mt-4 p-4 bg-gray-50 rounded-lg animate-fade-in">
      <h4 className="font-medium text-gray-900">Estimation</h4>
      <div className="mt-2 space-y-1 text-sm text-gray-600">
        <p>Prix par km : {Number(prixParKm).toFixed(2)} DT</p>
        <p>Prix total : {Number(estimation.prixBase).toFixed(2)} DT</p>
        <p>Frais de service : {Number(estimation.fraisService).toFixed(2)} DT</p>
        
        {Object.entries(estimation.detail.majorations || {}).map(([type, value]) => (
          <p key={type}>
            Majoration {type} : {value} {type === 'passagers' ? 'passager(s)' : 'DT'}
          </p>
        ))}

        <div className="border-t border-gray-200 my-2 pt-2">
          <p>Distance : {Number(estimation.detail.distance).toFixed(1)} km</p>
          <p>Durée estimée : {estimation.detail.duree}</p>
        </div>

        <p className="text-lg font-semibold text-primary mt-2">
          Total : {Number(estimation.total).toFixed(2)} DT
        </p>
      </div>

      <Button 
        type="submit"
        className={`w-full mt-4 ${
          searchingDriver 
            ? 'bg-blue-900 hover:bg-blue-800' 
            : 'bg-primary hover:bg-primary/90'
        }`}
        disabled={searchingDriver}
        onClick={onSearchStart}
      >
        {searchingDriver ? (
          <SearchingDriverAnimation 
            searchStep={searchStep}
            searchMessages={searchMessages}
            selectedDepartCity={selectedDepartCity}
            selectedArriveeCity={selectedArriveeCity}
          />
        ) : (
          'Confirmer la réservation'
        )}
      </Button>
    </div>
  );
}; 