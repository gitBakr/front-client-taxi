import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

console.log('🌍 Configuration API:', {
  environment: import.meta.env.MODE,
  apiUrl: API_URL,
  fullUrl: `${API_URL}/api`,
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD
});

const api = axios.create({
    baseURL: `${API_URL}/api`,
    headers: {
        'Content-Type': 'application/json'
    },
    validateStatus: (status) => {
        console.log('📡 Status API:', status);
        return status >= 200 && status < 300;
    }
});

export const villeAPI = {
    search: (query: string) => api.get(`/villes/search?q=${query}`),
    getDisponibles: () => api.get('/villes/disponibles')
};

// Interface pour les majorations
interface Majorations {
    climatisation?: number;
    nuit?: number;
    weekend?: number;
}

// Interface pour la réponse de l'estimation
interface EstimationResponse {
    status: string;
    data: {
        details: {
            prixBase: number;
            fraisService: number;
            total: number;
            distance: number;
            duree: number;
            supplements?: {
                passagers?: string;
                climatisation?: string;
            };
        };
    };
}

// Interface pour les coordonnées
interface Coordinates {
    latitude: number;
    longitude: number;
}

// Types pour la validation
interface VilleCoordonnees {
    nom: string;
    coordinates: {
        latitude: number;
        longitude: number;
    };
}

interface EstimationParams {
    depart: VilleCoordonnees;
    arrivee: VilleCoordonnees;
    date: string;
    passagers: number;
    options?: string[];
}

export const prixAPI = {
    calculerPrix: (params: EstimationParams) => {
        // Validation des données
        if (!params.depart.coordinates || !params.arrivee.coordinates) {
            throw new Error('Coordonnées manquantes');
        }

        // Formatage des paramètres
        const queryParams = {
            depart: params.depart.nom,
            departLat: Number(params.depart.coordinates.latitude).toFixed(6),
            departLng: Number(params.depart.coordinates.longitude).toFixed(6),
            arrivee: params.arrivee.nom,
            arriveeLat: Number(params.arrivee.coordinates.latitude).toFixed(6),
            arriveeLng: Number(params.arrivee.coordinates.longitude).toFixed(6),
            date: params.date,
            passagers: Number(params.passagers),
            options: params.options?.join(',') || 'climatisation'
        };

        console.log('🚀 Requête API:', {
            url: `${API_URL}/api/prix/estimation`,
            params: queryParams,
            environment: import.meta.env.MODE
        });

        return api.get<{status: string; data: EstimationResponse}>('/prix/estimation', { 
            params: queryParams
        });
    }
}; 