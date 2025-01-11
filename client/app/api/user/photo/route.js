import axios from 'axios';
import { cookies } from 'next/headers';

export async function POST(request) {
    try {
        const formData = await request.formData();
        const token = (await cookies()).get('token')?.value;

        if (!token) {
            return new Response(JSON.stringify({ error: 'Token not found' }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' },
            });
        }
        
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/edit-photo`, formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`,
                }
            }
        );
        console.log(response)
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