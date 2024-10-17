import React, { useEffect, useState } from 'react';
import GooglePlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';

const AddressAutocomplete = (props) => {
    const [address, setAddress] = useState('');
    const [autoComplete, setAutoComplete] = useState({ lat: 0, lng: 0, address: '' });
    const [isScriptLoaded, setIsScriptLoaded] = useState(true);

    const handleSelect = async (address) => {
        setAddress(address);
        try {
            const results = await geocodeByAddress(address.label);
            const { lat, lng } = await getLatLng(results[0]);
            setAutoComplete({ lat: lat, lng: lng, address: address.label });
        } catch (error) {
            console.error('Error getting geocode:', error);
        }
    };

    useEffect(() => {
        props.onChange(autoComplete);
    }, [autoComplete]);


    return (
        <div>

            {isScriptLoaded && (
                <GooglePlacesAutocomplete
                
                    selectProps={{
                        onChange: handleSelect,
                    }}
                />
            )}
        </div>
    );
};

export default AddressAutocomplete;
