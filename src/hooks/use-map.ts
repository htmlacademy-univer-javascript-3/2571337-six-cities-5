import { MutableRefObject, useEffect, useRef, useState } from 'react';
import leaflet, { Map } from 'leaflet';
import { TCity } from '../types/city.types';

type UseMapProps = {
    mapRef: MutableRefObject<HTMLDivElement | null>;
    city: TCity;
}

export function useMap({ city, mapRef }: UseMapProps) {
  const [map, setMap] = useState<Map | null>(null);
  const isRenderedMap = useRef(false);

  useEffect(() => {
    if (mapRef.current && !isRenderedMap.current) {
      const instance = leaflet.map(mapRef.current, {
        center: {
          lat: city.location.latitude,
          lng: city.location.longitude
        },
        zoom: city.location.zoom
      });

      leaflet
        .tileLayer(
          'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
          {
            attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          }
        )
        .addTo(instance);

      setMap(instance);
      isRenderedMap.current = true;
    }
  }, [mapRef, city]);

  return map;
}
