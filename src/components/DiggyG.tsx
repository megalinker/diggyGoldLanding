import { useState, useEffect } from "react";

import DiggyG1 from '/assets/DiggyG/DiggyG1.webp';
import DiggyG2 from '/assets/DiggyG/DiggyG2.webp';
import DiggyG3 from '/assets/DiggyG/DiggyG3.webp';
import DiggyG4 from '/assets/DiggyG/DiggyG4.webp';
import DiggyG5 from '/assets/DiggyG/DiggyG5.webp';
import DiggyG6 from '/assets/DiggyG/DiggyG6.webp';

const images = [
    DiggyG1,
    DiggyG2,
    DiggyG3,
    DiggyG4,
    DiggyG5,
    DiggyG6
];

const DiggyG: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 250); // 0.4s interval

        return () => clearInterval(interval);
    }, []);

    return (
        <img
            src={images[currentIndex]}
            alt={`Slide ${currentIndex + 1}`}
            style={{ display: 'block', width: '100%', height: '100%' }}
            className="w-full h-auto transition-opacity duration-400 ease-in-out"
        />
    );
};

export default DiggyG;
