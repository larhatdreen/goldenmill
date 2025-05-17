import { useState, useEffect } from 'react';
import { getCookieConsent } from '../utils/cookie.utils';
import { logger } from '../services/logger/logger.service';
import { api } from '../utils/api.utils';
import { LanguagesEnum } from '../components/translation/i18n';

interface GeolocationState {
  latitude: number | null;
  longitude: number | null;
  error: string | null;
}

interface Coordinates {
  latitude: number;
  longitude: number;
}

export const getLanguageFromCoordinates = (latitude: number, longitude: number): LanguagesEnum => {
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
    return LanguagesEnum.RUSSIAN;
  }

  if (
    latitude >= germanyBounds.south &&
    latitude <= germanyBounds.north &&
    longitude >= germanyBounds.west &&
    longitude <= germanyBounds.east
  ) {
    return LanguagesEnum.GERMANY;
  }

  return LanguagesEnum.ENGLISH;
};

const getGeolocation = () => {
  if (typeof window === 'undefined' || !navigator.geolocation) {
    return null;
  }
  return navigator.geolocation;
}

export const useGeolocation = () => {
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cookieConsent = getCookieConsent();
    
    if (!cookieConsent?.consents.geolocation) {
      setError('Geolocation consent not granted');
      return;
    }

    const geolocation = getGeolocation();
    if (!geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    geolocation.getCurrentPosition(
      (position) => {
        setCoordinates({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      },
      (error) => {
        setError(error.message);
      }
    );
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
    if (coordinates?.latitude && coordinates?.longitude) {
      sendLocationToBackend({
        coords: {
          latitude: coordinates.latitude,
          longitude: coordinates.longitude,
          accuracy: 0,
          altitude: null,
          altitudeAccuracy: null,
          heading: null,
          speed: null
        } as GeolocationCoordinates,
        timestamp: Date.now(),
      } as GeolocationPosition);
    }
  }, [coordinates?.latitude, coordinates?.longitude]);

  return { coordinates, error };
}; 