import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

export const config = {
  apiUrl,
  fullUrl: apiUrl,
  environment: import.meta.env.MODE,
  isDevelopment: import.meta.env.MODE === 'development',
  isProduction: import.meta.env.MODE === 'production'
};

// Logs de configuration
console.log('🌍 Configuration API:', config);

// Instance Axios avec configuration
export const api = axios.create({
  baseURL: apiUrl,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Intercepteur pour les requêtes
api.interceptors.request.use(request => {
  // Ajout de /api si nécessaire
  if (request.url && !request.url.startsWith('/api/')) {
    request.url = `/api${request.url}`;
  }

  console.log('🚀 Requête sortante:', {
    method: request.method,
    url: request.url,
    fullUrl: `${apiUrl}${request.url}`,
    params: request.params,
    headers: request.headers
  });
  return request;
});

// Intercepteur pour les réponses
api.interceptors.response.use(
  response => {
    console.log('📥 Réponse entrante:', {
      status: response.status,
      url: response.config.url,
      data: response.data
    });
    return response;
  },
  error => {
    console.error('❌ Erreur API:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      config: error.config
    });
    return Promise.reject(error);
  }
);
