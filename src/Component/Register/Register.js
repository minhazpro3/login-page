import React from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router';
import useFirebase from '../Hooks/useFirebase';
import './Register.css'

const Register = () => {
  const { googleSignIn, setUser, createUserEmailPassword, updateName, setIsLoading, error, setError } = useFirebase()
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const url = location.state?.from || '/congratulation';
  const onSubmit = async data => {
    if (data.password === data.password2) {
      await createUserEmailPassword(data.email, data.password)
        .then((userCredential) => {
          const user = userCredential.user;
          setUser(user)
          navigate(url)
          setIsLoading(true)
          if (user) {
            reset()
          }

        })
        .catch((error) => {
          if (error) {
            setError(false)
          }

        });
      updateName(data.name)

    }

  };
  const handleGoogleLogin = () => {
    googleSignIn()
      .then((result) => {
        setUser(result.user);
        navigate(url)
        setIsLoading(true)
      }).catch((error) => {
        if (error) {
          setError(false)
        }
      }).finally(() => setIsLoading(false));
  }



  return (
    <div className="registerDiv">
      <h2>Please Register</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="register">
          <input {...register("name")} placeholder="name" type="text" required />

          <input {...register("email")} placeholder="email" type="email" required />

          <input {...register("password")} placeholder="password" type="password" required />


          <input {...register("password2")} placeholder="Confirm password" type="password" required />


          <input className="submit" type="submit" />
        </div>
      </form>

      <button className="buttonGoogle" onClick={handleGoogleLogin} >google sign in</button>
    </div>
  );
};

export default Register;