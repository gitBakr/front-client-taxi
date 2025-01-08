// Types communs
export interface APIResponse<T> {
  status: string;
  data: T;
}

// Types pour les villes
export interface City {
  _id: string;
  nom: string;
  gouvernorat: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  location?: {
    type: "Point";
    coordinates: [number, number];
  };
  score?: number;
}

export interface VilleSearchData {
  data: City[];
}

export interface VilleSearchResponse {
  status: string;
  data: VilleSearchData;
}

// Type pour la réponse API des villes
export type VilleAPIResponse = {
  status: 'success' | 'error';
  data: City[];
};

// Types pour l'estimation
export interface EstimationResponse {
  montant: number;
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
}

// Type pour la réponse API d'estimation
export type EstimationAPIResponse = APIResponse<EstimationResponse>;

// Types pour les paramètres
export interface VilleCoordonnees {
  nom: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

export interface EstimationParams {
  depart: VilleCoordonnees;
  arrivee: VilleCoordonnees;
  date: string;
  passagers: number;
  options?: string[];
}

export interface EstimationState {
  prixParKm: number;
  prixBase: number;
  fraisService: number;
  total: number;
  detail: {
    distance: number;
    duree: string;
    majorations: Record<string, string | undefined>;
  };
}
