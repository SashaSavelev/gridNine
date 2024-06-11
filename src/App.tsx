import React, { useState } from 'react';
import Filter from './components/Filter';
import Flights from './components/Flights';
import { Flight2 } from './interfaces/index'; 

const App: React.FC = () => {
  const [flights, setFlights] = useState<Flight2[] | null>(null);

  return (
    <div className="flex bg-white rounded-lg shadow-md p-2">
      <div className="w-1/4  px-4  py-7">
        <Filter flights={flights} setFlights={setFlights} />
      </div>
      <div className="w-3/4 p-6">
        <Flights flights={flights} />
      </div>
    </div>
  );
};

export default App;
