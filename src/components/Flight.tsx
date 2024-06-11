import React from 'react';
import { Flight2 } from '../interfaces/index';
import CardPart from './CardPart';
import Logo from './Logo';

interface FlightProps {
    flight: Flight2;
}

const Flight: React.FC<FlightProps> = ({ flight }) => {
    return (
        <div className="w-full bg-specialBlue mb-4">
            <div className="flex justify-between pt-1 px-4 items-center">
                <div className="h-12 p-0 flex items-center">
                    <Logo caption={flight.carrier.caption} />
                </div>
                <div className="text-right text-white">
                    <p className="text-2xl">{flight.price.total.amount} ₽</p>
                    <p className="text-sm -mt-1">Стоимость для одного взрослого пассажира</p>
                </div>
            </div>
            <CardPart carrier={flight.carrier} leg={flight.legs[0]} />
            <CardPart carrier={flight.carrier} leg={flight.legs[1]} />
            <button className="w-full bg-specialOrange text-white py-3">ВЫБРАТЬ</button>
        </div>
    );
};

export default Flight;
