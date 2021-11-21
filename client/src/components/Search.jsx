import React, { useState, useEffect } from 'react';
import { fetcher } from '../helpers/fetcher';
import LocationInput from './LocationInput';

const Search = () => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      const countries = await fetcher('/countries', 'GET');
      setCountries(countries);
    };
    fetchCountries();
  }, []);

  return (
    <main>
      <div>
        <LocationInput locations={countries}></LocationInput>
      </div>
    </main>
  );
};

export default Search;
