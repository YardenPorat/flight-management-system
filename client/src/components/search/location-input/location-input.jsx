import React, { useState, useEffect } from 'react';
import { Autocomplete, TextField } from '@mui/material';

const LocationInput = ({ locations, label, valueCallback }) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    setOptions(locations);
  }, [locations]);

  return (
    <Autocomplete
      disablePortal
      options={options}
      sx={{ width: 300, backgroundColor: 'rgba(255, 255, 255, 0.736)', borderRadius: '5px' }}
      renderInput={(params) => <TextField {...params} label={label} />}
      onChange={(_event, value) => (value ? valueCallback(value.id) : '')}
      autoComplete={false}
    />
  );
};

export default LocationInput;
