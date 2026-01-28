'use client';

import { useState, useCallback } from 'react';

interface GeolocationCoords {
  latitude: number;
  longitude: number;
  accuracy: number;
}

interface GeolocationState {
  coords: GeolocationCoords | null;
  error: string | null;
  loading: boolean;
}

interface UseGeolocationReturn extends GeolocationState {
  requestLocation: () => Promise<GeolocationCoords | null>;
  clearError: () => void;
}

const DEFAULT_OPTIONS: PositionOptions = {
  enableHighAccuracy: true,
  timeout: 10000,
  maximumAge: 300000, // 5 minutes cache
};

export function useGeolocation(options: PositionOptions = DEFAULT_OPTIONS): UseGeolocationReturn {
  const [state, setState] = useState<GeolocationState>({
    coords: null,
    error: null,
    loading: false,
  });

  const requestLocation = useCallback(async (): Promise<GeolocationCoords | null> => {
    // Check if geolocation is supported
    if (!navigator.geolocation) {
      setState((prev) => ({
        ...prev,
        error: 'La géolocalisation n\'est pas supportée par votre navigateur',
        loading: false,
      }));
      return null;
    }

    setState((prev) => ({ ...prev, loading: true, error: null }));

    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords: GeolocationCoords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
          };
          setState({ coords, error: null, loading: false });
          resolve(coords);
        },
        (err) => {
          let errorMessage: string;
          switch (err.code) {
            case err.PERMISSION_DENIED:
              errorMessage = 'Vous avez refusé l\'accès à votre position';
              break;
            case err.POSITION_UNAVAILABLE:
              errorMessage = 'Position non disponible';
              break;
            case err.TIMEOUT:
              errorMessage = 'Délai d\'attente dépassé';
              break;
            default:
              errorMessage = 'Erreur de géolocalisation';
          }
          setState((prev) => ({ ...prev, error: errorMessage, loading: false }));
          resolve(null);
        },
        options
      );
    });
  }, [options]);

  const clearError = useCallback(() => {
    setState((prev) => ({ ...prev, error: null }));
  }, []);

  return {
    ...state,
    requestLocation,
    clearError,
  };
}

export default useGeolocation;
