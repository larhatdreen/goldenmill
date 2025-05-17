import { useState, useEffect } from 'react';
import { getCookieConsent } from '../utils/cookie.utils';
import { logger } from '../services/logger/logger.service';
import { api } from '../utils/api.utils';

interface GeolocationState {
  latitude: number | null;
  longitude: number | null;
  error: string | null;
}

export const getLanguageFromCoordinates = (latitude: number, longitude: number): string => {
  // Примерные границы России
  const russiaBounds = {
    north: 77.7,
    south: 41.2,
    east: 190.0,
    west: 19.9
  };

  // Примерные границы Германии
  const germanyBounds = {
    north: 55.1,
    south: 47.3,
    east: 15.0,
    west: 5.9
  };

  if (
    latitude >= russiaBounds.south &&
    latitude <= russiaBounds.north &&
    longitude >= russiaBounds.west &&
    longitude <= russiaBounds.east
  ) {
    return 'ru';
  }

  if (
    latitude >= germanyBounds.south &&
    latitude <= germanyBounds.north &&
    longitude >= germanyBounds.west &&
    longitude <= germanyBounds.east
  ) {
    return 'de';
  }

  return 'en';
};

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