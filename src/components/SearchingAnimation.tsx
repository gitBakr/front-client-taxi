import { City } from "@/lib/api";
import { ReactNode } from 'react';

interface SearchingAnimationProps {
  searchStep: number;
  searchMessages: readonly string[];
  selectedDepartCity: City | null;
  selectedArriveeCity: City | null;
  children?: ReactNode;
}

export const SearchingAnimation: React.FC<SearchingAnimationProps> = ({
  searchStep,
  searchMessages,
  selectedDepartCity,
  selectedArriveeCity
}) => {
  const currentMessage = searchMessages[searchStep] || searchMessages[0];

  return (
    <div className="space-y-4 py-6 bg-gradient-to-b from-slate-800 to-slate-900 rounded-lg w-full">
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="animate-spin h-12 w-12 border-4 border-teal-400 border-t-transparent rounded-full shadow-lg shadow-teal-500/20" />
        <span className="text-xl font-semibold text-white text-center px-4">
          {currentMessage}
        </span>
      </div>
      <div className="text-base font-medium text-teal-200 mt-4 text-center">
        <span className="text-white">{selectedDepartCity?.nom || ''}</span>
        <span className="mx-2 text-teal-400">→</span>
        <span className="text-white">{selectedArriveeCity?.nom || ''}</span>
      </div>
      <div className="flex justify-center items-center px-4 mt-2">
        <div className="text-sm text-teal-100 font-medium text-center w-full max-w-[250px] leading-relaxed space-y-1">
          <p>Veuillez patienter</p>
          <p>pendant que nous recherchons</p>
          <p className="text-teal-300">le meilleur chauffeur disponible</p>
        </div>
      </div>
    </div>
  );
}; 