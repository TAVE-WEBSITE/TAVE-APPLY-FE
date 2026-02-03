'use client';

import { useEffect, useRef, useState } from 'react';
import useResult from '@/hooks/useResult';

interface MapProps {
    address: string;
}

const Map = ({ address }: MapProps) => {
    const mapRef = useRef<HTMLDivElement>(null);
    const { applyCoordinates } = useResult();
    const [coords, setCoords] = useState<{ x: number; y: number }>();

    useEffect(() => {
        if (!address) return;

        const fetchCoords = async () => {
            const data = await applyCoordinates(address);
            const { x, y } = data[0];
            setCoords({ x: parseFloat(x), y: parseFloat(y) });
        };

        fetchCoords();
    }, [address]);

    useEffect(() => {
        if (!coords || !window.naver || !mapRef.current) return;

        const { x, y } = coords;
        const location = new window.naver.maps.LatLng(y, x);
        const map = new window.naver.maps.Map(mapRef.current, {
            center: location,
            zoom: 15,
        });
        new window.naver.maps.Marker({
            position: location,
            map,
        });
    }, [coords]);

    return <div ref={mapRef} className="w-full md:h-[300px] h-[240px] border border-gray-300" />;
};

export default Map;
