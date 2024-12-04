import { MutableRefObject } from 'react';
import { makeFakeCity } from '../mocks/cities';
import { TCity } from '../types/city.types';
import { renderHook } from '@testing-library/react';
import leaflet from 'leaflet';
import { useMap } from './use-map';

vi.mock('leaflet', () => ({
  default: {
    map: vi.fn().mockReturnValue({
      addTo: vi.fn()
    }),
    tileLayer: vi.fn().mockReturnValue({
      addTo: vi.fn()
    })
  }
}));

describe('Hook: useMap', () => {
  let mapRef: MutableRefObject<HTMLDivElement>;
  let city:TCity;

  beforeEach(() => {
    vi.clearAllMocks();
    mapRef = {
      current: document.createElement('div')
    };

    city = makeFakeCity();
  });

  it('should leaflet.map called with mapRef.current and city, called tileLayer, called addTo, and map was defined', () =>{
    const expectedConfigurationParam = {
      center: {
        lat: city.location.latitude,
        lng: city.location.longitude
      },
      zoom: city.location.zoom
    };
    vi.spyOn(leaflet, 'tileLayer');
    vi.spyOn(leaflet, 'map');

    const { result } = renderHook(() => useMap({ city, mapRef }));
    const map = result.current;

    expect(leaflet.tileLayer).toBeCalledTimes(1);
    expect(leaflet.map).toBeCalledWith(mapRef.current, expectedConfigurationParam);
    expect(map).toBeDefined();
  });

  it('should leaflet.map called 1 time with rerender', () =>{
    vi.spyOn(leaflet, 'map');

    const { rerender } = renderHook(() => useMap({ city, mapRef }));
    rerender();

    expect(leaflet.tileLayer).toBeCalledTimes(1);
  });
});
