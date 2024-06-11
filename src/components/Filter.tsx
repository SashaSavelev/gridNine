import React, { useEffect, useState } from 'react';
import flightsData from '../data/flights.json'; 
import { Root, Flight2 } from '../interfaces';
import Sorting from './Sorting';
import Filtering from './Filtering';

interface FilterProps {
  setFlights: React.Dispatch<React.SetStateAction<Flight2[] | null>>; 
  flights: Flight2[] | null;
}

const Filter: React.FC<FilterProps> = ({ setFlights, flights }) => {
  const jsonFlights: Root = flightsData as Root;   
  const flightDetails: Flight2[] = jsonFlights.result.flights.map(flight => flight.flight);

  const [prices, setPrices] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const pricesData: { [key: string]: number } = {};
    flightDetails.forEach(flight => {
      const airline = flight.carrier.caption;
      const price = parseFloat(flight.price.total.amount);
      if (!pricesData[airline] || price < pricesData[airline]) {
        pricesData[airline] = price;
      }
    });
    setPrices(pricesData);
  }, []);

  return (
    <div>
      <Sorting flights={flights} initialfFlights={flightDetails} setFlights={setFlights}/>
      <Filtering flights={flights} setFlights={setFlights} prices={prices} />
    </div>
  );
};

export default Filter;
