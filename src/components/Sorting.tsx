import React from 'react';
import { Flight2 } from '../interfaces';

interface SortingFlights {
  setFlights: React.Dispatch<React.SetStateAction<Flight2[] | null>>; 
  initialfFlights: Flight2[] | null;
  flights: Flight2[] | null;
}

const Sorting: React.FC<SortingFlights> = ({ setFlights, initialfFlights, flights }) => {
    const handleSortByPriceAsc = () => {
        const currentFlights = flights ?? initialfFlights;
        if (currentFlights) {
          const sortedFlights = [...currentFlights].sort((a, b) => 
            parseFloat(a.price.total.amount) - parseFloat(b.price.total.amount)
          );
          setFlights(sortedFlights);
        }
      };

    const handleSortByPriceDesc = () => {
        const currentFlights = flights ?? initialfFlights;
        if (currentFlights) {
          const sortedFlights = [...currentFlights].sort((a, b) => 
            parseFloat(b.price.total.amount) - parseFloat(a.price.total.amount)
          );
          setFlights(sortedFlights);
        }
      };

    const handleSortByDuration = () => {
        const currentFlights = flights ?? initialfFlights;
        if (currentFlights) {
          const sortedFlights = [...currentFlights].sort((a, b) => 
            (a.legs[0].duration + a.legs[1].duration) - (b.legs[0].duration + b.legs[1].duration)
          );
          setFlights(sortedFlights);
        }
    };

  return (
    <div className='flex-col p-3 mb-3'>
     <p className='font-bold mb-3'>Сортировать</p>
      <div>
        <input 
          type="radio" 
          id="priceAsc" 
          name="sorting" 
          onClick={handleSortByPriceAsc} 
        />
        <label htmlFor="priceAsc"> - по возрастанию цены</label>
      </div>
      <div>
        <input 
          type="radio" 
          id="priceDesc" 
          name="sorting" 
          onClick={handleSortByPriceDesc} 
        />
        <label htmlFor="priceDesc"> - по убыванию цене</label>
      </div>
      <div>
        <input 
          type="radio" 
          id="duration" 
          name="sorting" 
          onClick={handleSortByDuration} 
        />
        <label htmlFor="duration"> - по времени в пути</label>
      </div>
    </div>
  );
};

export default Sorting;
