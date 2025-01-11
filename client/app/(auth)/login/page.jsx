"use client";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

const Login = () => {
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState(null);
    const [ loading, setLoading ] = useState(false);
    const router = useRouter();

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const response = await axios.post("/api/user", data);
            if (response.status === 200) {
                router.refresh('/dashboard');
            }
        } catch (err) {
            setError(err.response?.data?.error || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col justify-center flex-1 min-h-full px-6 py-12 lg:px-8">
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-4 sm:mx-auto sm:w-full sm:max-w-sm'>
                <div className='flex flex-col w-full gap-2'>
                    <label className='text-sm' htmlFor="username">Username</label>
                    <Input type="text" {...register("username")} required />
                </div>
                <div className='flex flex-col w-full gap-2'>
                    <label className='text-sm' htmlFor="password">Password</label>
                    <Input type="password" {...register("password")} required />
                </div>
                {error && <p className="text-sm text-red-500">{error}</p>}
                <Button className="w-full" type="submit" disabled={loading}>
                    {loading ?" Signing in..." : "Sign in"}
                </Button>
            </form>
        </div>
    );
};

export default Login;
