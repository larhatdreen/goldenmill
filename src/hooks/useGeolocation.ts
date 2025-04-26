import { useState, useEffect } from 'react';
import { getCookieConsent } from '../utils/cookie.utils';
import { logger } from '../services/logger/logger.service';
import { api } from '../utils/api.utils';

interface GeolocationState {
  latitude: number | null;
  longitude: number | null;
  error: string | null;
}

export const useGeolocation = () => {
  const [state, setState] = useState<GeolocationState>({
    latitude: null,
    longitude: null,
    error: null,
  });

  useEffect(() => {
    const cookieConsent = getCookieConsent();
    
    if (cookieConsent?.consents.geolocation) {
      if (!navigator.geolocation) {
        setState(prev => ({ ...prev, error: 'Geolocation is not supported' }));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            error: null,
          });
        },
        (error) => {
          setState(prev => ({ ...prev, error: error.message }));
        }
      );
    }
  }, []);

  const sendLocationToBackend = async (position: GeolocationPosition) => {
    try {
      const locationData = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        timestamp: position.timestamp,
      };

      const response = await api.post('/api/location', locationData);
      if (response.success) {
        logger.logGeolocation(position);
      } else {
        logger.logError(new Error(`Failed to send location: ${response.error}`));
      }
    } catch (error) {
      logger.logError(error as Error);
    }
  };

  useEffect(() => {
    if (state.latitude && state.longitude) {
      sendLocationToBackend({
        coords: {
          latitude: state.latitude,
          longitude: state.longitude,
          accuracy: 0,
          altitude: null,
          altitudeAccuracy: null,
          heading: null,
          speed: null
        } as GeolocationCoordinates,
        timestamp: Date.now(),
      } as GeolocationPosition);
    }
  }, [state.latitude, state.longitude]);

  return state;
}; 