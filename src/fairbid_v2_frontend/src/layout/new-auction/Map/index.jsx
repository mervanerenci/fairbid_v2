// components
import {GoogleMap, useJsApiLoader} from '@react-google-maps/api';

// hooks
import {memo} from 'react';

// theme
import style from './style';

// paste your Google map key here as a string or get it from .env file
const MAP_KEY = process.env.REACT_APP_PUBLIC_MAP_KEY;

const coords = {
    lat: 40.73936818014904, lng: -73.44753952002102
};

const Map = () => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: MAP_KEY
    })

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={{
                width: '100%',
                height: '100%',
                borderRadius: '10px'
            }}
            center={coords}
            zoom={9}
            options={{
                disableDefaultUI: true,
                zoomControl: false,
                styles: style,
            }}
        >
            { /* Child components, such as markers, info windows, etc. */ }
            <></>
        </GoogleMap>
    ) : <></>
}

export default memo(Map)