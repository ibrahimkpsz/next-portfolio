import axios from 'axios';
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const { username, password } = await request.json();

        const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user`, {
            username,
            password
        });
        const data = response.data;

        if (data.token) {
            const res = NextResponse.json(data);

            res.cookies.set('token', data.token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 60 * 60 * 24,
                path: '/',
            });

            return res;
        }

        return new Response(JSON.stringify({ error: 'Authentication failed' }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        if (error.response) {
            const { status, data } = error.response;

            if (status === 400 || status === 401) {
                return new Response(
                    JSON.stringify({ error: data.error || 'Invalid username or password' }),
                    {
                        status,
                        headers: { 'Content-Type': 'application/json' },
                    }
                );
            }
        }

        return new Response(
            JSON.stringify({ error: 'Failed to fetch data' }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    }
}