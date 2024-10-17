import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const MapComponent = ({markers}) => {

    const containerStyle = {
        width: '100%',
        height: '400px',
        margin:"8px"
    };

    const center = {
        lat: markers.length > 0 ? markers[0].lat : 0,
        lng: markers.length > 0 ? markers[0].lng : 0,
    };
console.log(center);


    try {
        
    return (
   
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={12}
        >
            {markers.map((marker, index) => (
                <Marker
                    key={index}
                    position={{ lat: marker.lat, lng: marker.lng }}
                />
            ))}
        </GoogleMap>


);
    } catch (error) {
        console.log(error);
        
    }
};

export default MapComponent;
