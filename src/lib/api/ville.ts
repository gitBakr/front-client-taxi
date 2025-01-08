import { api } from './config';
import { VilleAPIResponse } from './types';

export const villeAPI = {
  search: async (query?: string, limit: number = 5) => {
    try {
      // Appel à l'API avec le bon endpoint
      const response = await api.get('/villes/autocomplete', {
        params: { 
          q: query?.trim(),  // Nettoyer la requête
          limit,
          fields: 'nom,gouvernorat,coordinates,score'  // Spécifier les champs souhaités
        }
      });

      // Log détaillé de la requête
      console.log('🔍 Requête ville:', {
        endpoint: '/villes/autocomplete',
        params: { q: query, limit },
        url: response.config.url
      });

      // Log détaillé de la réponse
      console.log('📥 Réponse brute:', response.data);

      // Vérification et transformation de la réponse
      if (response.data?.status === 'success') {
        return {
          status: 'success',
          data: Array.isArray(response.data.data) ? response.data.data : []
        };
      }

      return { status: 'success', data: [] };
    } catch (error) {
      console.error('❌ Erreur API:', error);
      return { status: 'success', data: [] };
    }
  }
};
