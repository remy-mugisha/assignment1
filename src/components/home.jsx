import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, Polyline } from '@react-google-maps/api';

const mapContainerStyle = {
  height: '100vh',
  width: '100%'
};

const routeCoordinates = [
  { lat: -1.939826787816454, lng: 30.0445426438232 }, // Nyabugogo
  { lat: -1.9355377074007851, lng: 30.060163829002217 }, // Stop A
  { lat: -1.9358808342336546, lng: 30.08024820994666 }, // Stop B
  { lat: -1.9489196023037583, lng: 30.092607828989397 }, // Stop C
  { lat: -1.9592132952818164, lng: 30.106684061788073 }, // Stop D
  { lat: -1.9487480402200394, lng: 30.126596781356923 }, // Stop E
  { lat: -1.9365670876910166, lng: 30.13020167024439 }  // Kimironko
];

const Home = () => {
  const [currentStopIndex, setCurrentStopIndex] = useState(0);
  const [center, setCenter] = useState(routeCoordinates[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStopIndex(prevIndex => {
        const newIndex = (prevIndex + 1) % routeCoordinates.length;
        setCenter(routeCoordinates[newIndex]); 
        return newIndex;
      });
    }, 3000); 

    return () => clearInterval(interval); 
  }, []);

  return (
    <div>
      <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={13}
        >
          {routeCoordinates.map((coord, index) => (
            <Marker key={index} position={coord} />
          ))}
          <Marker
            position={routeCoordinates[currentStopIndex]}
            icon={{ url: "http://maps.google.com/mapfiles/ms/icons/bus.png" }}
          />
          <Polyline
            path={routeCoordinates}
            options={{
              strokeColor: "#FF0000",
              strokeOpacity: 0.8,
              strokeWeight: 6,
              geodesic: true, 
            }}
          />
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default Home;
