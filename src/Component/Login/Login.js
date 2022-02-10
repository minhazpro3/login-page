import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router';
import useFirebase from '../Hooks/useFirebase';

const Login = () => {
    const {user,setUser,loginEmailAndPassword,setIsLoading,error,setError}=useFirebase()
    const { register, handleSubmit,reset} = useForm();
    const navigate = useNavigate();
  const location = useLocation();
  const url = location.state?.from || '/congratulation';
    const onSubmit = async data => {
        await loginEmailAndPassword(data.email, data.password)
        .then((userCredential) => {
            const user = userCredential.user;
            setUser(user)
            navigate(url)
            if(user){
                reset()
            }
          })
          .catch((error) => {
            if(error){
                setError(false)
            }
          })
    }
    return (
        <div>
             <form onSubmit={handleSubmit(onSubmit)}>

            <input  {...register("email")} required  placeholder="email" type="email" />
            <br/>
            {!error&&<small>Something Wrong</small>}
            <br/>
            
            
          
           <input className=" w-75 ps-2" {...register("password")} required placeholder="password" type="password"  />
            <br/>
            {!error&&<small>Something Wrong</small>}
            <br/>
           
            
            <input className="my-2 w-75 bg-danger border-0 text-white" type="submit" />
            </form>
            <br/>
            <p>Don't have an account. <Link to="/register">Register</Link></p>
        </div>
    );
};

export default Login;