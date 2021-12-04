import React, { useState, useEffect } from 'react';
import { DatePicker } from '@mui/lab';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateAdapter from '@mui/lab/AdapterMoment';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import { TextField } from '@mui/material';
import { fetcher } from '../../helpers/fetcher';
import LocationInput from './location-input/location-input';
import dates from '../../helpers/dates';
import moment from 'moment';
import { useAuth } from '../../auth/auth-provider';
import classes from './search.module.css';
import { BasicModal } from '../modal/modal';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

const columns = [
  { field: 'id', headerName: 'Flight ID', width: 100 },
  { field: 'airlineName', headerName: 'Airline Name', width: 200 },
  { field: 'originCountryName', headerName: 'Origin Country', width: 150 },
  { field: 'destinationCountryName', headerName: 'Destination Country', width: 180 },
  { field: 'departureTime', headerName: 'Departure Time', width: 150 },
  { field: 'landingTime', headerName: 'Landing Time', width: 150 },
  { field: 'remainingTickets', headerName: 'Remaining Tickets', width: 200 },
];

const dateFormat = 'DD/MM/YYYY HH:MM';

const Search = () => {
  const [countries, setCountries] = useState([]);
  const [originCountryId, setOriginCountryId] = useState(null);
  const [destinationCountryId, setDestinationCountryId] = useState(null);
  const [departureDate, setDepartureDate] = useState(null);
  const [gridData, setGridData] = useState([]);
  const [countryMap, setCountryMap] = useState();
  const [modal, setModal] = useState({ header: 'Alert', content: <></> });
  const [open, setOpen] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCountries = async () => {
      const countriesArr = await fetcher('/countries', 'GET');

      const countryMap = new Map();
      const countryOptions = countriesArr.map((country) => {
        countryMap.set(country.id, country.name);
        return { id: country.id, label: country.name };
      });
      setCountryMap(countryMap);
      setCountries(countryOptions);
    };
    fetchCountries();
  }, [setCountryMap]);

  const handleSearch = async () => {
    if (!originCountryId || !destinationCountryId) {
      setModal({
        header: 'Missing parameters',
        content: (
          <>
            <Typography sx={{ mt: 2 }}>Please select origin country and destination country</Typography>
            <Button sx={{ mt: 2 }} variant='contained' onClick={() => setOpen(false)}>
              OK
            </Button>
          </>
        ),
      });
      setOpen(true);
      return;
    }

    let matchingFlights;
    if (departureDate) {
      const date = dates.toDbFormat(departureDate);
      matchingFlights = await fetcher('flights/by-parameters', 'POST', { originCountryId, destinationCountryId, date });
    } else {
      matchingFlights = await fetcher('flights/by-countries', 'POST', { originCountryId, destinationCountryId });
    }
    if (!matchingFlights.length) {
      setModal({
        header: 'Error',
        content: (
          <>
            <Typography sx={{ mt: 2 }}>No matching flights</Typography>
            <Button sx={{ mt: 2 }} variant='contained' onClick={() => setOpen(false)}>
              OK
            </Button>
          </>
        ),
      });
      setOpen(true);
    } else {
      const airlines = await fetcher('/airlines', 'GET');
      const airlinesMap = new Map();
      for (const { id, name } of airlines) {
        airlinesMap.set(id, name);
      }

      setGridData(
        matchingFlights.map((flight) => {
          return {
            id: flight.id,
            airlineName: airlinesMap.get(flight.airline_id),
            originCountryName: countryMap.get(flight.origin_country_id),
            destinationCountryName: countryMap.get(flight.destination_country_id),
            departureTime: moment(flight.departure_time).format(dateFormat),
            landingTime: moment(flight.landing_time).format(dateFormat),
            remainingTickets: flight.remaining_tickets,
          };
        })
      );
    }
  };

  const purchaseTicket = async (id) => {
    setOpen(false);
    const response = await fetcher('/tickets/', 'POST', { username: auth.user.username, flightId: id });
    if (typeof response.ticketId == 'number') {
      setModal({
        header: 'Success',
        content: (
          <>
            <Typography sx={{ mt: 2 }}>
              Ticket was purchase successfully.
              <br />
              Your ticket number is: {response.ticketId}
            </Typography>
            <Button sx={{ mt: 2 }} variant='contained' onClick={() => setOpen(false)}>
              OK
            </Button>
          </>
        ),
      });

      setGridData((prevState) =>
        prevState.map((flight) => {
          if (flight.id === id) {
            flight.remainingTickets--;
          }
          return flight;
        })
      );
      setOpen(true);
    } else {
      setModal({
        header: 'Error',
        content: (
          <>
            <Typography sx={{ mt: 2 }}>
              Failed to purchase ticket:
              <br />
              {response.message}
            </Typography>
            <Button sx={{ mt: 2 }} variant='contained' onClick={() => setOpen(false)}>
              OK
            </Button>
          </>
        ),
      });
      setOpen(true);
    }
  };

  const handleRowClick = async (params) => {
    if (!auth.user) {
      setModal({
        header: 'Please login',
        content: (
          <>
            <Typography sx={{ mt: 2 }}>You cannot buy a ticket if you are not logged in</Typography>
            <Button
              sx={{ mt: 2 }}
              variant='contained'
              onClick={() => {
                setOpen(false);
                navigate('/login');
              }}
            >
              Login
            </Button>
            <Button sx={{ mt: 2, ml: 2 }} variant='contained' onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </>
        ),
      });
      setOpen(true);
      return;
    } else {
      setModal({
        header: 'Purchase Confirmation',
        content: (
          <>
            <Typography sx={{ mt: 2 }}>Would you like to purchase a ticket for this flight?</Typography>

            <Button sx={{ mt: 2 }} variant='contained' onClick={() => purchaseTicket(params.id)}>
              Buy
            </Button>
            <Button sx={{ mt: 2, ml: 2 }} variant='contained' onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </>
        ),
      });
      setOpen(true);
    }
  };

  return (
    <main>
      <div className={classes.inputsContainer}>
        <LocationInput locations={countries} label='From' valueCallback={setOriginCountryId}></LocationInput>
        <LocationInput locations={countries} label='To' valueCallback={setDestinationCountryId}></LocationInput>
        <LocalizationProvider dateAdapter={DateAdapter}>
          <DatePicker
            label='Departure Date'
            inputFormat='DD/MM/yyyy'
            value={departureDate}
            onChange={setDepartureDate}
            clearable
            renderInput={(params) => (
              <TextField {...params} sx={{ backgroundColor: 'rgba(255, 255, 255, 0.736)', borderRadius: '5px' }} />
            )}
          />
        </LocalizationProvider>
        <Button variant='contained' onClick={handleSearch}>
          Search
        </Button>
      </div>
      <br />
      <br />
      <div className={classes.gridContainer}>
        <div className={classes.grid}>
          <DataGrid sx={{ width: '90%' }} rows={gridData} columns={columns} onRowClick={handleRowClick} />
        </div>
      </div>
      {open && <BasicModal header={modal.header} content={modal.content} setOpen={setOpen} />}
    </main>
  );
};

export default Search;
