import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';

const Register = () => {
    const navigate = useNavigate();
    const { setAuthUser } = useAuth();
    const [loading, setLoading] = useState(false);
    const [inputData, setInputData] = useState({});

    const handelInput = (e) => {
        setInputData({
            ...inputData, [e.target.id]: e.target.value
        });
    };

    const selectGender = (selectGender) => {
        setInputData((prev) => ({
            ...prev, gender: selectGender === inputData.gender ? '' : selectGender
        }));
    };

    const handelSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (inputData.password !== inputData.confpassword) {
            setLoading(false);
            return toast.error("Passwords don't match");
        }
        try {
            const register = await axios.post(`/api/auth/register`, inputData);
            const data = register.data;
            if (data.success === false) {
                setLoading(false);
                toast.error(data.message);
                console.log(data.message);
                return;
            }
            toast.success(data?.message);
            localStorage.setItem('chatapp', JSON.stringify(data));
            setAuthUser(data);
            setLoading(false);
            navigate('/login');
        } catch (error) {
            setLoading(false);
            console.log(error);
            toast.error(error?.response?.data?.message);
        }
    };

    return (
        <div className='flex flex-col items-center justify-center min-w-full min-h-screen bg-gray-900'>
            <div className='w-full max-w-md p-6 rounded-lg shadow-lg bg-gray-800 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-70'>
                <h1 className='text-3xl font-bold text-center text-white mb-6'>Sign Up</h1>
                <form onSubmit={handelSubmit} className='flex flex-col'>
                    {/* Full Name */}
                    <div className='mb-4'>
                        <label className='block text-gray-300 font-bold mb-2' htmlFor='fullname'>
                            Full Name:
                        </label>
                        <input
                            id='fullname'
                            type='text'
                            onChange={handelInput}
                            placeholder='Enter Full Name'
                            required
                            className='w-full input input-bordered h-10 text-gray-800 bg-gray-200 rounded-md' />
                    </div>

                    {/* Username */}
                    <div className='mb-4'>
                        <label className='block text-gray-300 font-bold mb-2' htmlFor='username'>
                            Username:
                        </label>
                        <input
                            id='username'
                            type='text'
                            onChange={handelInput}
                            placeholder='Enter Username'
                            required
                            className='w-full input input-bordered h-10 text-gray-800 bg-gray-200 rounded-md' />
                    </div>

                    {/* Email */}
                    <div className='mb-4'>
                        <label className='block text-gray-300 font-bold mb-2' htmlFor='email'>
                            Email:
                        </label>
                        <input
                            id='email'
                            type='email'
                            onChange={handelInput}
                            placeholder='Enter Email'
                            required
                            className='w-full input input-bordered h-10 text-gray-800 bg-gray-200 rounded-md' />
                    </div>

                    {/* Password */}
                    <div className='mb-4'>
                        <label className='block text-gray-300 font-bold mb-2' htmlFor='password'>
                            Password:
                        </label>
                        <input
                            id='password'
                            type='password'
                            onChange={handelInput}
                            placeholder='Enter Password'
                            required
                            className='w-full input input-bordered h-10 text-gray-800 bg-gray-200 rounded-md' />
                    </div>

                    {/* Confirm Password */}
                    <div className='mb-4'>
                        <label className='block text-gray-300 font-bold mb-2' htmlFor='confpassword'>
                            Confirm Password:
                        </label>
                        <input
                            id='confpassword'
                            type='password'
                            onChange={handelInput}
                            placeholder='Enter Confirm Password'
                            required
                            className='w-full input input-bordered h-10 text-gray-800 bg-gray-200 rounded-md' />
                    </div>

                    {/* Gender Selection */}
                    <div className="flex items-center mb-4">
                        <span className="font-bold text-gray-300 mr-4">Gender:</span>
                        <label className="cursor-pointer flex items-center mr-4">
                            <span className="label-text font-semibold text-gray-300">Male</span>
                            <input
                                onChange={() => selectGender('male')}
                                checked={inputData.gender === 'male'}
                                type='checkbox'
                                className="checkbox checkbox-info ml-2" />
                        </label>
                        <label className="cursor-pointer flex items-center">
                            <span className="label-text font-semibold text-gray-300">Female</span>
                            <input
                                checked={inputData.gender === 'female'}
                                onChange={() => selectGender('female')}
                                type='checkbox'
                                className="checkbox checkbox-info ml-2" />
                        </label>
                    </div>

                    {/* Register Button */}
                    <button type='submit'
                        className='mt-4 self-center w-auto px-4 py-2 bg-gray-700 text-lg text-white rounded-lg hover:bg-gray-600 transition duration-300 ease-in-out'>
                        {loading ? "Loading..." : "Register"}
                    </button>
                </form>

                {/* Login Redirect */}
                <div className='pt-4 text-center'>
                    <p className='text-sm font-semibold text-gray-300'>
                        Already have an account? <Link to={'/login'}>
                            <span className='text-green-400 font-bold underline cursor-pointer hover:text-green-300'>
                                Login Now!!
                            </span>
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Register;
