import { api } from './config';
import { EstimationAPIResponse, EstimationParams } from './types';

// API pour la gestion des prix
export const prixAPI = {
  // Calcul du prix d'une course
  calculerPrix: async (params: EstimationParams) => {
    console.log('💰 Envoi requête prix:', params);

    try {
      // Utilisation de GET avec query params au lieu de POST
      const response = await api.get('/prix/estimation', {
        params: {
          depart: params.depart.nom,
          arrivee: params.arrivee.nom,
          passagers: params.passagers,
          options: 'climatisation'
        }
      });
      
      console.log('💰 Réponse prix:', response.data);
      return response;
    } catch (error) {
      console.error('❌ Erreur calcul prix:', error);
      throw error;
    }
  }
};
