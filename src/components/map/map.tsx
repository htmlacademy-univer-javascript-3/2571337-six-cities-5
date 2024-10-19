import { useEffect, useRef } from 'react';
import { useMap } from '../../hooks/use-map';
import { Icon, layerGroup, Marker } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { TCity } from '../../types/city.types';
import { URL_MARKER_CURRENT, URL_MARKER_DEFAULT } from '../../constants/map';
import { CommonOffer } from '../../types/offer.types';

type MapProps = {
    city: TCity;
    offers: CommonOffer[];
    selectedOffer?: CommonOffer['id'] | null;
    className: string;
}

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

export function Map({ city, offers, selectedOffer, className }: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const map = useMap({mapRef, city});

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      offers.forEach((offer) => {
        const point = offer.location;
        const marker = new Marker({
          lat: point.latitude,
          lng: point.longitude
        });
        marker
          .setIcon(
            selectedOffer && selectedOffer === offer.id
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(markerLayer);
      });
      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, offers, selectedOffer]);
  return (
    <section className={`${className} map`} ref={mapRef}/>
  );
}
