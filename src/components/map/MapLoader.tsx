'use client';

import Script from 'next/script';

const MapLoader = () => {
    return (
        <Script
            strategy="afterInteractive"
            src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_NAVER_API_KEY_ID}`}
        />
    );
};

export default MapLoader;
