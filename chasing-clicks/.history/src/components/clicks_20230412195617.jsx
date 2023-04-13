// // // Build a web page  with a clickable button and a click count. Every time that the button is clicked, the number increases by 1. When the web page is refreshed, the click count number should reflect all previous clicks. That means, refreshing the page should not reset the count to 0 or any other default number.

import React, { useState, useEffect, useRef } from "react";
// import mapboxgl from "mapbox-gl";
// import "mapbox-gl/dist/mapbox-gl.css";

// mapboxgl.accessToken =
//   "pk.eyJ1IjoibWlra3lsYW5reSIsImEiOiJjbGV2dXI3eTQwYTg2M3JvNGVxbWptNmJ3In0.xuQVWBqJAcjqBOTa_CbJgA";

// const Clicks = () => {
//   const [count, setCount] = useState(0);
//   const [map, setMap] = useState(null);
//   const [country, setCountry] = useState(null);
//   const [state, setState] = useState(null);
//   const [clicksByLocation, setClicksByLocation] = useState({});
//   const mapContainerRef = useRef(null);

//   const handleClick = () => {
//     const increasedCount = count + 1;
//     let country = "";
//     let state = "";
//     navigator.geolocation.getCurrentPosition(
//       async (position) => {
//         const { latitude, longitude } = position.coords;
//         const lngLat = [longitude, latitude];
//         // Save the user's location and click count to local storage
//         const location = JSON.stringify({
//           lngLat,
//           count: increasedCount,
//         });
//         localStorage.setItem("location", location);
//         // Center the map on the user's location
//         map.flyTo({
//           center: lngLat,
//           zoom: 15,
//         });
//         // Create a new marker at the user's location
//         new mapboxgl.Marker().setLngLat(lngLat).addTo(map);
//         // Reverse geo-code the user's location to get the country and state
//         const response = await fetch(
//           `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?proximity=ip&access_token=${mapboxgl.accessToken}`
//         );
//         const data = await response.json();
//         const features = data.features;
//         // Loop through the features to find the country and state
//         if (features && features.length > 0) {
//           for (let i = 0; i < features.length; i++) {
//             const feature = features[i];
//             const placeType = feature.place_type;
//             if (placeType.includes("country")) {
//               country = feature.text;
//             }
//             if (placeType.includes("region")) {
//               state = feature.text;
//             }
//           }
//         }
//         // Update the country and state elements
//         setCountry(country);
//         setState(state);
//         // Save the country and state to local storage
//         localStorage.setItem("country", country);
//         localStorage.setItem("state", state);
//         // Update the clicks by location object
//         // setClicksByLocation((prevState) => {
//         //   const newClicksByLocation = { ...prevState };
//         //   const key = `${country}-${state}`;
//         //   if (newClicksByLocation[key]) {
//         //     newClicksByLocation[key] = newClicksByLocation[key] + 1;
//         //   } else {
//         //     newClicksByLocation[key] = 1;
//         //   }
//         //   return newClicksByLocation;
//         // });
//         setClicksByLocation((prevClicks) => {
//           const key = `${country}, ${state}`;
//           const value = (prevClicks[key] || 0) + 1;
//           localStorage.setItem("clicksByLocation", JSON.stringify({
//             ...prevClicks,
//             [key]: value
//           }));
//           return {
//             ...prevClicks,
//             [key]: value
//           };
//         });
//       },
//       (error) => {
//         console.error(error);
//       }
//     );
//     setCount(increasedCount);
//   };

//   useEffect(() => {
//     // Retrieve the saved location and click count from local storage
//     const location = localStorage.getItem("location");
//     const storedCountry = localStorage.getItem("country");
//     const storedState = localStorage.getItem("state");
//     const clicksByLocation =
//       JSON.parse(localStorage.getItem("clicksByLocation")) || {};
//     setClicksByLocation(clicksByLocation);
//     if (location) {
//       const { lngLat, count } = JSON.parse(location);
//       setCount(count);
//       const map = new mapboxgl.Map({
//         container: mapContainerRef.current,
//         style: "mapbox://styles/mapbox/streets-v11",
//         center: lngLat,
//         zoom: 15,
//       });
//       new mapboxgl.Marker().setLngLat(lngLat).addTo(map);
//       setMap(map);
//     }
//     if (
//       storedCountry &&
//       storedState &&
//       storedCountry !== "undefined" &&
//       storedState !== "undefined"
//     ) {
//       setCountry(storedCountry);
//       setState(storedState);
//     } else {
//       const map = new mapboxgl.Map({
//         container: mapContainerRef.current,
//         style: "mapbox://styles/mapbox/streets-v11",
//         center: [-74.5, 40],
//         zoom: 9,
//       });
//       map.on("load", () => {
//         setMap(map);
//       });
//     }
//   }, []);

//   return (
//     <div>
//       <h1>Clicks</h1>
//       <button onClick={handleClick}>Click Me</button>
//       {country && state && (
//         <p>
//           You clicked me from {state}, {country}.
//         </p>
//       )}
//       <div
//         ref={mapContainerRef}
//         className="map-container"
//         style={{ width: "200px", height: "200px" }}
//       />
//       <h2>Clicks By Location</h2>
//       <ul>
//         {Object.keys(clicksByLocation).map((key) => {
//           return (
//             <li key={key}>
//               {key}: {clicksByLocation[key]}
//             </li>
//           );
//         })}
//       </ul>
//     </div>
//   );
// };

// export default Clicks;
const Clicks = () => {
const [count, setCount] = useState(0);
const [state, setState] = useState('');
const [country, setCountry] = useState('');
const [clicksByLocation, setClicksByLocation] = useState([]);

const handleButtonClick = () => {
  setCount(count + 1);

  fetch('http://api.ipapi.com/api/161.185.160.93?access_key=8237438ad6763a6a661dc2ee2a7e2058')
    .then((response) => response.json())
    .then((data) => {
      const { country_name, region } = data;
      setState(region);
      setCountry(country_name);

      const location = `${region}, ${country_name}`;
      const existingLocationIndex = clicksByLocation.findIndex((item) => item.location === location);
      if (existingLocationIndex !== -1) {
        const updatedClicksByLocation = [...clicksByLocation];
        updatedClicksByLocation[existingLocationIndex].count++;
        setClicksByLocation(updatedClicksByLocation);
      } else {
        setClicksByLocation([...clicksByLocation, { location, count: 1 }]);
      }
    })
    .catch((error) => {
      console.error('Error fetching location:', error);
    });
};

useEffect(() => {
  const savedCount = localStorage.getItem('count');
  if (savedCount !== null) {
    setCount(parseInt(savedCount));
  }
}, []);

useEffect(() => {
  localStorage.setItem('count', count.toString());
}, [count]);

return (
  <div>
    <p>Count: {count}</p>
    <p>Location: {state}, {country}</p>
    <button onClick={handleButtonClick}>Click me</button>
    <ul>
      {clicksByLocation.map((item) => (
        <li key={item.location}>{item.location}: {item.count} clicks</li>
      ))}
    </ul>
  </div>
);
}
export default Clicks;