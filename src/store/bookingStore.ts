import { create } from 'zustand';
import { City } from '@/lib/api/types';

interface BookingState {
  // Données de réservation
  departCity: City | null;
  arriveCity: City | null;
  date: string;
  time: string;
  estimation: {
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
  } | null;
  paymentMethod: 'card' | 'cash' | null;

  // Actions
  setDepartCity: (city: City | null) => void;
  setArriveCity: (city: City | null) => void;
  setDate: (date: string) => void;
  setTime: (time: string) => void;
  setEstimation: (estimation: any) => void;
  setPaymentMethod: (method: 'card' | 'cash' | null) => void;
  resetBooking: () => void;
}

export const useBookingStore = create<BookingState>((set) => ({
  // État initial
  departCity: null,
  arriveCity: null,
  date: new Date().toISOString().split('T')[0],
  time: '12:00',
  estimation: null,
  paymentMethod: null,

  // Actions
  setDepartCity: (city) => set({ departCity: city }),
  setArriveCity: (city) => set({ arriveCity: city }),
  setDate: (date) => set({ date }),
  setTime: (time) => set({ time }),
  setEstimation: (estimation) => set({ estimation }),
  setPaymentMethod: (method) => set({ paymentMethod: method }),
  resetBooking: () => set({
    departCity: null,
    arriveCity: null,
    date: new Date().toISOString().split('T')[0],
    time: '12:00',
    estimation: null,
    paymentMethod: null,
  }),
})); 