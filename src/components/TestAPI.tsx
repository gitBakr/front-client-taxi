import { useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import axios from 'axios';

const API_BASE_URL = 'https://backend-taxi-e2lz.onrender.com/api';

export function TestAPI() {
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Configuration axios avec headers standards
  const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      // 'Authorization': `Bearer ${localStorage.getItem('token')}` // Si besoin
    }
  });

  const testEndpoints = {
    // Test recherche villes
    testVillesSearch: async () => {
      setLoading(true);
      try {
        const response = await api.get('/villes/search?q=tunis');
        setResult(response.data);
        setError(null);
      } catch (err) {
        setError('Erreur lors de la recherche des villes');
        console.error(err);
      } finally {
        setLoading(false);
      }
    },

    // Test calcul distance
    testDistance: async () => {
      setLoading(true);
      try {
        const response = await api.get(
          '/distance/calculate?originLat=36.8065&originLng=10.1815&destLat=35.8245&destLng=10.6346'
        );
        setResult(response.data);
        setError(null);
      } catch (err) {
        setError('Erreur lors du calcul de la distance');
        console.error(err);
      } finally {
        setLoading(false);
      }
    },

    // Test connexion API
    testConnection: async () => {
      setLoading(true);
      try {
        const response = await api.get('/');
        setResult({ status: 'API connectée', data: response.data });
        setError(null);
      } catch (err) {
        setError('Erreur de connexion à l\'API');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold mb-4">Test API</h2>
      
      <div className="space-x-4">
        <Button 
          onClick={testEndpoints.testConnection}
          disabled={loading}
        >
          Tester Connexion API
        </Button>
        <Button 
          onClick={testEndpoints.testVillesSearch}
          disabled={loading}
        >
          Tester Recherche Villes
        </Button>
        <Button 
          onClick={testEndpoints.testDistance}
          disabled={loading}
        >
          Tester Calcul Distance
        </Button>
      </div>

      {loading && (
        <div className="text-center">
          <div className="animate-spin h-6 w-6 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
          <p className="mt-2 text-sm text-gray-600">Chargement...</p>
        </div>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertTitle>Erreur</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {result && (
        <Alert>
          <AlertTitle>Résultat</AlertTitle>
          <AlertDescription>
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4 overflow-auto">
              <code className="text-white">
                {JSON.stringify(result, null, 2)}
              </code>
            </pre>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
} 