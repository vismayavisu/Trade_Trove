import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import { useState } from "react";
import axios from "axios";
import API_URL from "../constants";

function Login() {
    const navigate = useNavigate()

    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleApi = () => {
        // Basic validation
        if (!username.trim()) {
            setErrorMessage('Please enter your username');
            return;
        }
        if (!password.trim()) {
            setErrorMessage('Please enter your password');
            return;
        }
        // Clear error message if everything is fine
        setErrorMessage('');

        const url = API_URL + '/login';
        const data = { username, password };
        axios.post(url, data)
            .then((res) => {
                if (res.data.message) {
                    if (res.data.token) {
                        localStorage.setItem('token', res.data.token);
                        localStorage.setItem('userId', res.data.userId);
                        navigate('/');
                    }
                }
            })
            .catch((err) => {
                alert('SERVER ERR')
            })
    }

    return (
        <div>
            <Header />
            <div className="p-3 m-3">
                <h3> Welocme to Login Page </h3>
                <br></br>
                USERNAME
                <input className="form-control" type="text" value={username}
                    onChange={(e) => {
                        setusername(e.target.value)
                    }} />
                <br></br>
                PASSWORD
                <input className="form-control" type="password" value={password}
                    onChange={(e) => {
                        setpassword(e.target.value)
                    }} />
                <br></br>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                <button className="btn btn-primary mr-3" onClick={handleApi}> LOGIN </button>
                <Link className="m-3" to="/signup"><button className="btn btn-primary mr-3"> SIGNUP</button></Link>
            </div>
        </div>
    )
}

export default Login;