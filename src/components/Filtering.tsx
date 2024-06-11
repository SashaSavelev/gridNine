import React, { useState, useEffect } from 'react';
import { Flight2 } from '../interfaces';

interface FilteringProps {
    setFlights: React.Dispatch<React.SetStateAction<Flight2[] | null>>;
    flights: Flight2[] | null;
    prices: { [key: string]: number };
}

const Filtering: React.FC<FilteringProps> = ({ setFlights, flights, prices }) => {
    const [minPrice, setMinPrice] = useState<string | number>(0);
    const [maxPrice, setMaxPrice] = useState<string | number>(1000000);
    const [oneStop, setOneStop] = useState(false);
    const [nonStop, setNonStop] = useState(false);
    const [selectedAirlines, setSelectedAirlines] = useState<string[]>([]);
    const [originalFlights, setOriginalFlights] = useState<Flight2[] | null>(null);

    useEffect(() => {
        if (flights && !originalFlights) {
            setOriginalFlights(flights);
        }
    }, [flights, originalFlights]);

    useEffect(() => {
        if (originalFlights) {
            let filteredFlights = [...originalFlights];

            const min = typeof minPrice === 'number' ? minPrice : parseFloat(minPrice);
            const max = typeof maxPrice === 'number' ? maxPrice : parseFloat(maxPrice);
            if (!isNaN(min) && !isNaN(max)) {
                filteredFlights = filteredFlights.filter(flight => {
                    const price = parseFloat(flight.price.total.amount);
                    return price >= min && price <= max;
                });
            }

            if (oneStop && nonStop) {
                filteredFlights = filteredFlights.filter(
                    flight =>
                        flight.legs.some(leg => leg.segments.length === 1) ||
                        flight.legs.reduce((count, leg) => count + (leg.segments.length === 2 ? 1 : 0), 0) === 1
                );
            } else if (oneStop) {
                filteredFlights = filteredFlights.filter(flight => flight.legs.reduce((count, leg) => count + (leg.segments.length === 2 ? 1 : 0), 0) === 1);
            } else if (nonStop) {
                filteredFlights = filteredFlights.filter(flight => flight.legs.every(leg => leg.segments.length === 1));
            }
            if (selectedAirlines.length > 0) {
                filteredFlights = filteredFlights.filter(flight => {
                    const airlineName = flight.carrier.caption;
                    return selectedAirlines.some(airline => airlineName.includes(airline));
                });
            }

            setFlights(filteredFlights);
        }
    }, [minPrice, maxPrice, oneStop, nonStop, selectedAirlines, originalFlights, setFlights]);

    const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setMinPrice(value ? parseFloat(value) : '');
    };

    const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setMaxPrice(value ? parseFloat(value) : '');
    };

    const handleCheckboxChange = (airline: string) => {
        const updatedAirlines = selectedAirlines.includes(airline) ? selectedAirlines.filter(item => item !== airline) : [...selectedAirlines, airline];
        setSelectedAirlines(updatedAirlines);
    };

    const airlines = Object.entries(prices);

    return (
        <>
            <div className="flex-col p-3 mb-3">
                <p className="font-bold mb-3">Фильтровать</p>
                <div>
                    <div>
                        <input type="checkbox" id="oneStop" checked={oneStop} onChange={() => setOneStop(!oneStop)} />
                        <label htmlFor="oneStop"> - 1 пересадка</label>
                    </div>
                    <div>
                        <input type="checkbox" id="nonStop" checked={nonStop} onChange={() => setNonStop(!nonStop)} />
                        <label htmlFor="nonStop"> - без пересадок</label>
                    </div>
                </div>
            </div>
            <div className="flex-col p-3 mb-3">
                <p className="font-bold mb-3">Цена</p>
                <div className="flex items-center mb-2 pl-">
                    <label htmlFor="minPrice" className="mr-2">
                        От
                    </label>
                    <input type="number" id="minPrice" value={minPrice} onChange={handleMinPriceChange} className="border border-black p-0  appearance-none" />
                </div>
                <div className="flex items-center">
                    <label htmlFor="maxPrice" className="mr-2">
                        До
                    </label>
                    <input type="number" id="maxPrice" value={maxPrice} onChange={handleMaxPriceChange} className="border border-black  p-0  appearance-none" />
                </div>
            </div>

            <div className="flex-col p-3 mb-3">
    <p className="font-bold mb-3">Авиакомпании</p>
    {airlines.map(([airline, price]) => (
        <div key={airline} className="flex items-center">
            <input
                type="checkbox"
                id={airline}
                checked={selectedAirlines.includes(airline)}
                onChange={() => handleCheckboxChange(airline)}
                className="mr-2"
            />
            <label htmlFor={airline} className="flex items-center w-full">
                <span className="flex-1 truncate">- {airline}</span> от {price} р.
            </label>
        </div>
    ))}
</div>


        </>
    );
};

export default Filtering;
