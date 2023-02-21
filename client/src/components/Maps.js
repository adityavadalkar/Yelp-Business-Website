import React from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
const MAPS_API = 'AIzaSyCILAnDUNwbvASMLmLuh2pmDLiYuqzyEuo'

function MyComponent(props) {
  const containerStyle = {
    width: '95%',
    height: '70vh',
    marginLeft: "auto",
    marginRight: "auto",
  };
  
  const center = {
    lat: props.details.coordinates.latitude,
    lng: props.details.coordinates.longitude
  };
  return (
    <LoadScript
      googleMapsApiKey={MAPS_API}
    >
      <GoogleMap 
        mapContainerStyle={containerStyle}
        center={center}
        zoom={13}
      >
        <Marker
      position={center}
      />
      </GoogleMap>
    </LoadScript>
  )
}

export default React.memo(MyComponent)