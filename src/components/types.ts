// Types pour les composants
export interface BookingFormProps {
  onSearchComplete: (result: {
    price: number;
    duration: string;
    distance: string;
  }) => void;
} 