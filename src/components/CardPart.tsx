import React from 'react';
import { Leg, Carrier } from '../interfaces';
import { formatDate } from '../utils/dateUtils';
import { formatDuration } from '../utils/durationUtils';
interface LegProps {
    carrier: Carrier;
    leg: Leg | null;
}

const CardPart: React.FC<LegProps> = ({ leg, carrier }) => {
    const segmentLength = leg?.segments.length;
    const destinationSegment = segmentLength !== undefined ? segmentLength - 1 : 0;
    const departureDateArray = leg ? formatDate(leg?.segments[0].departureDate) : '';
    const arrivalDateArray = leg ? formatDate(leg?.segments[destinationSegment].arrivalDate) : '';
    const durationString = leg ? formatDuration(leg.duration) : '';

    return (
        <div className="pb-1 mt-0.5 bg-white rounded w-full">
            <div className="flex items-center gap-1 px-5 py-2 text-lg">
                <p>
                    {leg?.segments[0].departureCity?.caption}, <span className="uppercase">{leg?.segments[0].departureAirport.caption}</span>
                    <span className="text-specialBlue">({leg?.segments[0].departureAirport.uid})</span>
                </p>

                <div className="flex items-center justify-center  pb-2 text-specialBlue">⟶</div>

                <p>
                    <span className="uppercase">{leg?.segments[destinationSegment].arrivalCity?.caption}</span>,
                    {leg?.segments[destinationSegment].arrivalAirport.caption}
                    <span className="text-specialBlue">({leg?.segments[destinationSegment].arrivalAirport.uid})</span>
                </p>
            </div>
            <hr className="mx-2" />

            <div className="flex justify-between pt-3 items-center">
                <div className="flex justify-between w-full ">
                    <div className="px-5">
                        <p>
                            <span className="text-xl">{departureDateArray[0]} </span>
                            <span className="text-m text-specialBlue">
                                {departureDateArray[1]}. {departureDateArray[2]}
                            </span>
                        </p>
                    </div>

                    <div>
                        <p className="text-xl">&#128339; {durationString}</p>
                    </div>

                    <div className="px-5">
                        <p>
                            <span className="text-m text-specialBlue">
                                {arrivalDateArray[1]}. {arrivalDateArray[2]}
                            </span>
                            <span className="text-xl"> {arrivalDateArray[0]}</span>
                        </p>
                    </div>
                </div>
            </div>
            {destinationSegment > 0 ? (
                <div className="flex gap-2 items-center px-11 whitespace-nowrap">
                    <div className="border-t-2 w-full border-gray-300"></div>
                    <span className="text-specialOrange text-lg flex-grow">1 пересадка</span>
                    <div className="border-t-2 w-full border-gray-300"></div>
                </div>
            ) : (
                <div className="mx-10  my-5 border-t-2  border-gray-300"></div>
            )}

            <p className="text-lg mx-5 mt-1 mb-1 ">Рейс выполняет: {carrier.caption} </p>
        </div>
    );
};

export default CardPart;
