import axios from 'axios';

// Configuration de l'URL de l'API
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3002';

// Logs de configuration
console.log('🌍 Configuration API:', {
  environment: import.meta.env.MODE,
  apiUrl: API_URL,
  fullUrl: `${API_URL}/api`,
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD
});

// Instance Axios avec configuration
export const api = axios.create({
  baseURL: `${API_URL}/api`,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Intercepteur pour les requêtes
api.interceptors.request.use(request => {
  // Log détaillé de la requête
  console.log('🚀 Requête sortante:', {
    method: request.method,
    url: request.url,
    fullUrl: `${API_URL}/api${request.url}`,
    params: request.params,
    headers: request.headers
  });
  return request;
});

// Intercepteur pour les réponses
api.interceptors.response.use(
  response => {
    // Log détaillé de la réponse
    console.log('📥 Réponse entrante:', {
      status: response.status,
      url: response.config.url,
      data: response.data
    });
    return response;
  },
  error => {
    // Log détaillé des erreurs
    console.error('❌ Erreur API:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      config: error.config
    });
    return Promise.reject(error);
  }
);
