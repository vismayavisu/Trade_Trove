import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import axios from "axios";
import API_URL from "../constants";

function Signup() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleApi = () => {
        // Basic validation
        if (!username.trim()) {
            setErrorMessage('Please enter your username');
            return;
        }
        if (!mobile.trim()) {
            setErrorMessage('Please enter your mobile number');
            return;
        }
        // Mobile number validation
        const mobilePattern = /^[0-9]{10}$/;
        if (!mobilePattern.test(mobile.trim())) {
            setErrorMessage('Please enter a valid 10-digit mobile number');
            return;
        }
        if (!email.trim()) {
            setErrorMessage('Please enter your email');
            return;
        }
        // Email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email.trim())) {
            setErrorMessage('Please enter a valid email address');
            return;
        }
        if (!password.trim()) {
            setErrorMessage('Please enter your password');
            return;
        }
        //Adding validation for minimum password length
        if (password.trim().length < 6) {
            setErrorMessage('Password must be at least 6 characters long');
            return;
        }

        // Clear error message if everything is fine
        setErrorMessage('');

        const url = API_URL + '/signup';
        const data = { username, password, mobile, email };
        axios.post(url, data)
            .then((res) => {
                if (res.data.message) {
                    alert(res.data.message);
                }
            })
            .catch((err) => {
                alert('SERVER ERR')
            });
    };

    return (
        <div>
            <Header />
            <div className="p-3 m-3">
                <h3> Welcome to Signup Page </h3>
                <br />
                USERNAME
                <input className="form-control" type="text" value={username}
                    onChange={(e) => setUsername(e.target.value)} />
                <br />
                MOBILE
                <input className="form-control" type="text" value={mobile}
                    onChange={(e) => setMobile(e.target.value)} />
                <br />
                EMAIL
                <input className="form-control" type="text" value={email}
                    onChange={(e) => setEmail(e.target.value)} />
                <br />
                PASSWORD
                <input className="form-control" type="password" value={password}
                    onChange={(e) => setPassword(e.target.value)} />
                <br />
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                <button className="btn btn-primary mr-3" onClick={handleApi}> SIGNUP </button>
                <Link className="m-3" to="/login"><button className="btn btn-primary mr-3">LOGIN</button></Link>
            </div>
        </div>
    )
}

export default Signup;
