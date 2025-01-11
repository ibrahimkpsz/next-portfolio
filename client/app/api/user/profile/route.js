import axios from 'axios';
import { cookies } from 'next/headers';

export async function GET(request) {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/profile`);

        const data = response.data;

        return new Response(JSON.stringify(data), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: error }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

export async function POST(request) {
    try {
        const { name, surname, email, shortbio, urls, about, skills } = await request.json();
        const token = (await cookies()).get('token')?.value;

        if (!token) {
            return new Response(JSON.stringify({ error: 'Token not found' }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/edit-profile`,
            {
                name,
                surname,
                email,
                shortbio,
                urls,
                about,
                skills
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

        const data = response.data;

        return new Response(JSON.stringify(data), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: error }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}