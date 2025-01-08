const isDevelopment = import.meta.env.MODE === 'development';
const isProduction = import.meta.env.MODE === 'production';

const environment = import.meta.env.MODE || 'development';
const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3002';

export const config = {
  environment,
  apiUrl,
  fullUrl: `${apiUrl}/api`,
  isDevelopment,
  isProduction
};

// Log de la configuration au démarrage
console.log('🌍 Configuration API:', config); 