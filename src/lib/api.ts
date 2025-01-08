import axios from 'axios';
import { config } from '@/config';
import type { 
  EstimationParams, 
  VilleAPIResponse, 
  EstimationAPIResponse,
  City
} from './types';

// Type pour la réponse de status
interface StatusResponse {
  status: number;
  message: string;
}

// Type pour la réponse générique de l'API
interface APIResponseWrapper<T> {
  data: {
    status: string;
    data: T;
  };
}

export const villeAPI = {
  search: async (query: string) => {
    console.log('🔍 API - Recherche ville:', query);
    const response = await axios.get<VilleAPIResponse>(
      `${config.fullUrl}/villes/search?q=${query}`
    );
    return response.data;
  }
};

export const prixAPI = {
  calculerPrix: async (params: EstimationParams): Promise<APIResponseWrapper<EstimationAPIResponse>> => {
    console.log('💰 API - Calcul prix:', params);
    const response = await axios.post<EstimationAPIResponse>(
      `${config.fullUrl}/prix/calculer`, 
      params
    );
    console.log('📡 API - Réponse prix:', response.data);
    return response.data;
  }
};

// Fonction pour vérifier le status de l'API
export const checkAPIStatus = async (): Promise<StatusResponse> => {
  const response = await axios.get<StatusResponse>(`${config.apiUrl}/status`);
  return response.data;
};

// Re-export des types
export type { City, EstimationState, EstimationParams } from './types'; 