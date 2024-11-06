import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const navigate = useNavigate();
    const { setAuthUser } = useAuth();

    const [userInput, setUserInput] = useState({});
    const [loading, setLoading] = useState(false);

    const handelInput = (e) => {
        setUserInput({
            ...userInput, [e.target.id]: e.target.value
        });
    };

    const handelSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const login = await axios.post(`/api/auth/login`, userInput);
            const data = login.data;
            if (data.success === false) {
                setLoading(false);
                console.log(data.message);
                toast.error(data.message);
                return; // Exit if the login was unsuccessful
            }
            toast.success(data.message);
            localStorage.setItem('chatapp', JSON.stringify(data));
            setAuthUser(data);
            setLoading(false);
            navigate('/');
        } catch (error) {
            setLoading(false);
            console.log(error);
            toast.error(error?.response?.data?.message || "An error occurred.");
        }
    };

    return (
        <div className='flex flex-col items-center justify-center min-h-screen bg-gray-900'>
            <div className='w-full max-w-md p-6 rounded-lg shadow-lg bg-gray-800 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-70'>
                <h1 className='text-3xl font-bold text-center text-white mb-6'>Login</h1>
                <form onSubmit={handelSubmit} className='flex flex-col'>
                    {/* Email Input */}
                    <div className='mb-4'>
                        <label className='block text-gray-300 font-bold mb-2' htmlFor='email'>
                            Email:
                        </label>
                        <input
                            id='email'
                            type='email'
                            onChange={handelInput}
                            placeholder='Enter your email'
                            required
                            className='w-full input input-bordered h-10 text-gray-800 bg-gray-200 rounded-md' />
                    </div>

                    {/* Password Input */}
                    <div className='mb-4'>
                        <label className='block text-gray-300 font-bold mb-2' htmlFor='password'>
                            Password:
                        </label>
                        <input
                            id='password'
                            type='password'
                            onChange={handelInput}
                            placeholder='Enter your password'
                            required
                            className='w-full input input-bordered h-10 text-gray-800 bg-gray-200 rounded-md' />
                    </div>

                    {/* Submit Button */}
                    <button type='submit'
                        className='mt-4 px-4 py-2 bg-gray-700 text-lg text-white rounded-lg hover:bg-gray-600 transition duration-300 ease-in-out'>
                        {loading ? "Loading..." : "Login"}
                    </button>
                </form>

                {/* Register Link */}
                <div className='pt-4 text-center'>
                    <p className='text-sm font-semibold text-gray-300'>
                        Don't have an account? <Link to={'/register'}>
                            <span className='text-green-400 font-bold underline cursor-pointer hover:text-green-300'>
                                Register Now!!
                            </span>
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
