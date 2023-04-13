import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
// import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { useEffect, useState } from 'react';

mapboxgl.accessToken = 'pk.eyJ1IjoibWlra3lsYW5reSIsImEiOiJjbGV2dXI3eTQwYTg2M3JvNGVxbWptNmJ3In0.xuQVWBqJAcjqBOTa_CbJgA';

const ClickMap = () => {
  const [state, setState] = useState(() => {
    const value = localStorage.getItem("state");
    return value !== null ? JSON.parse(value) : "";
  });
  const [country, setCountry] = useState(() => {
    const value = localStorage.getItem("country");
    return value !== null ? JSON.parse(value) : "";
  });
  const [clicksByLocation, setClicksByLocation] = useState(() => {
    const value = localStorage.getItem("clicksByLocation");
    return value !== null ? JSON.parse(value) : {};
  });
  const [map, setMap] = useState(null);

  useEffect(() => {
    const savedState = JSON.parse(localStorage.getItem("state"));

    if (savedState) {
      setState(savedState);
    }

    const savedCountry = JSON.parse(localStorage.getItem("country"));

    if (savedCountry) {
      setCountry(savedCountry);
    }

    const savedClicksByLocation = JSON.parse(
      localStorage.getItem("clicksByLocation")
    );

    if (savedClicksByLocation) {
      setClicksByLocation(savedClicksByLocation);
    }

    const map = new mapboxgl.Map({
      container: "map",
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-74.5, 40],
      zoom: 9,
    });
    setMap(map);

    return () => map.remove();
  }, []);

  useEffect(() => {
    localStorage.setItem("state", JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    localStorage.setItem("country", JSON.stringify(country));
  }, [country]);

  useEffect(() => {
    localStorage.setItem("clicksByLocation", JSON.stringify(clicksByLocation));
  }, [clicksByLocation]);
  
}
export default ClickMap;