import React, { useState, useEffect } from 'react';
import { Flight2 } from '../interfaces/index';
import Flight from './Flight';

interface FlightsProps {
    flights: Flight2[] | null;
}

const Flights: React.FC<FlightsProps> = ({ flights }) => {
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        setShowAll(false);
    }, [flights]);

    const handleShowMore = () => {
        setShowAll(true);
    };

    if (!flights) {
        return <p>Начните выбирать свой рейс</p>;
    }

    const flightsToShow = showAll ? flights : flights.slice(0, 2);

    return (
        <div className='flex flex-col items-center'>
            {flightsToShow.length === 0 || flightsToShow == null ? (
                <p className='text-2xl mt-20'>К сожалению, мы не смогли найти подобных рейсов</p>
            ) : (
                flightsToShow.map((flight, index) => (
                    <Flight key={index} flight={flight} />
                ))
            )}
            {!showAll && flights.length > 2 && (
                <button onClick={handleShowMore} className="w-30 border-2 py-2 px-3 mt-4">
                    Показать ещё
                </button>
            )}
        </div>
    );
};

export default Flights;
