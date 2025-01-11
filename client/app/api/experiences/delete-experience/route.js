import axios from 'axios';
import { cookies } from 'next/headers';

export async function POST(request) {
    try {
        const { id } = await request.json();
        const cookieStore = await cookies();
        const token = cookieStore.get("token").value;

        const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/experiences/delete-experience`, { id },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            }
        );
        const data = response.data;

        return new Response(JSON.stringify(data), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error(error)
        return new Response(JSON.stringify({ error: error }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}