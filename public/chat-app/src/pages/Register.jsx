import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/img/logo.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { registerRoute } from '../utils/ApiRoutes';
const FormContainer = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    align-items: center;
    background-color: #131324;
    .brand {
        display: flex;
        align-items: center;
        gap: 1rem;
        justify-content: center;
        img {
            height: 5rem
        }
        h1 {
            color: white;
            text-transform: uppercase;
        }
    }
    form {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        background-color: black;
        border-radius: 2rem;
        padding: 3rem 5rem;
        input {
            background-color: transparent;
            padding: 1rem;
            border: 0.1rem solid #4e0eff;
            border-radius: 0.6rem;
            color: white;
            &:focus {
                border:0.1rem solid #997af0;
                outline: none
            }
        }
        button {
            background-color: #997af0;
            color: white;
            padding: 1rem 2rem;
            border: none;
            font-weight: bold;
            cursor: pointer;
            border-radius: 0.8rem;
            font-size: 1rem;
            transition: 0.5s ease-in-out;
            &:hover {
                background-color: #4e0eff;
            }
        }
        span {
            color: white;
            a {
                cursor: pointer;
                font-weight: bold;
            }
        }
    }
`;
export default function Register() {

    const navigate = useNavigate();

    const [value, setValue] = useState({
        username: "",
        password: "",
        email: "",
        confirmPassword: "",
    })

    const toastOptions = {
        position: "bottom-right",
        autoClose: 9000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };

    const handleChange = (event) => {
        setValue({ ...value, [event.target.name]: event.target.value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (handleValidation()) {
            const { password, confirmPassword, username, email } = value;
            const { data } = await axios.post(registerRoute, {
                username,
                email,
                password,
            });
            if (data.status === false) {
                toast.error(data.msg, toastOptions);
            }
            if (data.status === true) {
                localStorage.setItem('chat-app-user', JSON.stringify(data.user));
                navigate("/login?firstTime=true");
            }
        }
    }

    const handleValidation = () => {
        const { username, password, confirmPassword } = value;
        if (password !== confirmPassword) {
            toast.error('The password should be the same', toastOptions);
            return false;
        } else if (username.length < 3) {
            toast.error('The length of username must be greater than three letters', toastOptions);
            return false;
        } else if (password.length < 8) {
            toast.error('The length of password must be greater than eight letters', toastOptions);
            return false;
        }
        return true;
    }


    return (
        <>
            <FormContainer>
                <form onSubmit={(event) => handleSubmit(event)}>
                    <div className="brand">
                        <img src={Logo} alt=''></img>
                        <h1>NexWave</h1>
                    </div>
                    <input
                        type='text'
                        placeholder='username'
                        name='username'
                        onChange={(e) => handleChange(e)} />
                    <input
                        type='email'
                        placeholder='email'
                        name='email'
                        onChange={(e) => handleChange(e)} />
                    <input
                        type='password'
                        placeholder='password'
                        name='password'
                        onChange={(e) => handleChange(e)} />
                    <input
                        type='password'
                        placeholder='Confirm Password'
                        name='confirmPassword'
                        onChange={(e) => handleChange(e)} />
                    <button type='submit'>Create User</button>
                    <span>Already have an account ? <a onClick={() => { navigate('/login') }}>Sign In</a></span>
                </form>
            </FormContainer>
            <ToastContainer />
        </>
    )
}
