import { NextRequest } from 'next/server';
import axios from 'axios';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('query');

    if (!query) {
        return new Response(JSON.stringify({ error: '주소 없음' }), { status: 400 });
    }

    try {
        const res = await axios.get('https://maps.apigw.ntruss.com/map-geocode/v2/geocode', {
            params: { query },
            headers: {
                'x-ncp-apigw-api-key-id': process.env.NEXT_PUBLIC_NAVER_API_CLIENT,
                'x-ncp-apigw-api-key': process.env.NAVER_API_SERVER,
                Accept: 'application/json',
            },
        });

        return new Response(JSON.stringify(res.data), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: 'API 요청 실패' }), { status: 500 });
    }
}
