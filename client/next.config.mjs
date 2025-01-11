/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/login',
                has: [{ type: 'cookie', key: 'token' }],
                destination: '/dashboard',
                permanent: false,
            },
        ]
    },
    matcher: ['/dashboard'],
};

export default nextConfig;
