import React from 'react';

interface LogoProps {
    caption: string;
}

const Logo: React.FC<LogoProps> = ({ caption }) => {
    const getImageSrc = (caption: string): string => {
        switch (caption) {
            case 'Air France':
                return 'images/AirFrance.png';
            case 'KLM':
                return 'images/klm.png';
            case 'Аэрофлот - российские авиалинии':
                return 'images/Aeroflot.png';
            case 'TURK HAVA YOLLARI A.O.':
                return 'images/turkish_airlines.png';
            case 'Finnair Oyj':
                return 'images/fin_air.png';
            case 'Air Baltic Corporation A/S':
                return 'images/airBaltic.png';
            case 'Alitalia Societa Aerea Italiana':
                return 'images/Alitalia.png';
            case 'Pegasus Hava Tasimaciligi A.S.':
                return 'images/pegasus_airlines.png';
            case 'Brussels Airlines':
                return 'images/brussels-airlines.png';
            case 'LOT Polish Airlines':
                return 'images/LOT_Polish_Airlines.png';
            default:
                return 'images/default_logo.png'; 
        }
    };

    return (
        <>
            <img src={getImageSrc(caption)} alt={caption} className="h-full w-20 object-contain p-2" />
        </>
    );
};

export default Logo;
