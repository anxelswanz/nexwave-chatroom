import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/img/logo.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { Buffer } from 'buffer';
import loading from './../assets/img/loading.gif'
import { avatarRoute } from '../utils/ApiRoutes';
export default function SetAvatar() {

    const api = "http://api.multiavatar.com/45678945";
    const navigate = useNavigate();
    const [avatars, SetAvatars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectAvatar, setSelectAvatar] = useState(undefined);


    function choose(index) {
        setSelectAvatar(index);
        console.log(selectAvatar);
    }

    const toastOptions = {
        position: "bottom-right",
        autoClose: 9000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };

    const setProfilePicture = async () => {
        if (selectAvatar === undefined) {
            toast.error('Please select an avatar', toastOptions);
        } else {
            const user = await JSON.parse(localStorage.getItem("chat-app-user"));
            console.log('setavatar user =>', user);
            const data = await axios.post(`${avatarRoute}/${user._id}`, {
                image: avatars[selectAvatar]
            });
            console.log('=>', data.data);
            if (data.data.isSet) {
                user.isAvatarImageSet = true;
                user.avatarImage = data.data.image;
                localStorage.setItem("chat-app-user", JSON.stringify(user));
                navigate("/login");
            } else {
                toast.error("Error setting avatar. Please try again", toastOptions);
            }
        }
    }
    useEffect(() => {
        if (!localStorage.getItem('chat-app-user')) {
            navigate('/login');
        }
        const asyncFunc = async () => {
            const data = [];
            for (let i = 0; i < 4; i++) {
                const image = await axios.get(
                    `${api}/${Math.round(Math.random() * 1000)}`
                );

                const buffer = new Buffer(image.data);
                data.push(buffer.toString("base64"));
            }
            console.log(avatars)
            SetAvatars(data);
            setIsLoading(false);
        }
        asyncFunc();
    }, [])


    return (

        <>
            {
                isLoading ? <Container>
                    <img src={loading} alt='loader' className='loader' />
                </Container> :
                    <Container>
                        <div className="title-container">
                            <h1>
                                Pick an avatar as your profile picture
                            </h1>
                        </div>

                        <div className="avatars">

                            {
                                avatars.map((avatar, index) => {
                                    return (
                                        <div
                                            className={`avatar ${selectAvatar === index ? "selected" : ""
                                                }`}
                                        >
                                            <img
                                                src={`data:image/svg+xml;base64,${avatar}`}
                                                alt='avatar'
                                                onClick={() => choose(index)}
                                            />
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <button className='submit-btn' onClick={setProfilePicture}>Set as Profile Picture</button>
                    </Container>
            }

            <ToastContainer />
        </>
    )
}

const Container = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
gap: 3rem;
background-color: #131324;
height: 100vh;
    .loader {
        max-inline-size: 100%;
    }
    .title-container {
        h1 {
            color: white;
        }
    }
    .avatars {
        cursor: pointer;
        display: flex;
        gap: 2rem;
        padding: 0.6rem;
        border-radius: 5rem;
        transition: 0.5s ease-in-out;
        .avatar {
            border: 0.4rem solid transparent;
            padding: 0.4rem;
            border-radius: 5rem;
            display: flex;
            justify-content: center;
            align-items: center;
            img {
                height: 6rem;
            }
        }
        .selected {
            border: 0.4rem solid #4e0eff;
        }
    }
    .submit-btn {
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
   
`; 