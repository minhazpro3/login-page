import React from 'react';
import useFirebase from '../Hooks/useFirebase';
import './Congrates.css'

const Congrates = () => {
    const { user, logOut } = useFirebase()
    return (
        <div>
            <h3>Login Successful!!</h3>


            <div className="userNameWish">
                <h3>User Name: <span>{user.displayName}</span></h3>
                <button className="buttons" onClick={logOut} >Logout</button>
            </div>
            <div className="image">
                <img src="https://c.tenor.com/XloaeoqoOfcAAAAM/allianz-direct-success.gif" alt="success pic" />
            </div>
        </div>
    );
};

export default Congrates;