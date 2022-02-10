import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router';
import useFirebase from '../Hooks/useFirebase';
import './Login.css'

const Login = () => {
    const { user, setUser, loginEmailAndPassword, setIsLoading, error, setError } = useFirebase()
    const { register, handleSubmit, reset } = useForm();
    const navigate = useNavigate();
    const location = useLocation();
    const url = location.state?.from || '/congratulation';
    const onSubmit = async data => {
        await loginEmailAndPassword(data.email, data.password)
            .then((userCredential) => {
                const user = userCredential.user;
                setUser(user)
                navigate(url)
                if (user) {
                    reset()
                }
            })
            .catch((error) => {
                if (error) {
                    setError(false)
                }
            })
    }
    return (
        <div >
            <form onSubmit={handleSubmit(onSubmit)}>

                <div className="login">
                <h2>Please Login</h2>
                    <input  {...register("email")} required placeholder="email" type="email" />

                    {!error && <small>Something Wrong</small>}

                    <input className=" w-75 ps-2" {...register("password")} required placeholder="password" type="password" />

                    {!error && <small>Something Wrong</small>}

                    <input className="submit" type="submit" />
                </div>
            </form>
            <p >Don't have an account. <Link to="/register">Register</Link></p>
            <br />
        </div>
    );
};

export default Login;