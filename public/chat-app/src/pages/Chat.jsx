import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getAllUsers, host } from '../utils/ApiRoutes';
import Contacts from '../components/Contacts';
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';
import Logout from '../components/Logout';
import { io } from 'socket.io-client';

export default function Chat() {
    const socket = useRef();
    const [contacts, setContacts] = useState([]);
    const [currentUser, setCurrentUser] = useState(undefined);
    const navigate = useNavigate();
    const [currentChat, setCurrentChat] = useState(undefined);
    const [isLoaded, setIsLoaded] = useState(false);
    // useEffect(() => {
    //     const asyncFunc = async () => {
    //         if (!localStorage.getItem("chat-app-user")) {
    //             navigate("/login");
    //         } else {
    //             setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
    //         }

    //         if (currentUser) {
    //             const data = await axios.get(
    //                 `${getAllUsers}/${currentUser._id}`
    //             );
    //             console.log('123');
    //             setContacts(await data.data);
    //         }
    //     }
    //     asyncFunc();
    //     // fetchData();
    // }, [currentUser])

    async function fetchData() {
        if (!localStorage.getItem("chat-app-user")) {
            navigate("/login");
        } else {
            const user = JSON.parse(localStorage.getItem("chat-app-user"))
            const data = await axios.get(
                `${getAllUsers}/${user._id}`
            );
            setContacts(await data.data);
            setCurrentUser(await user);
            setIsLoaded(true);
            console.log('chat: user set');
        }
    }

    async function fetchData2() {
        if (!localStorage.getItem("chat-app-user")) {
            navigate("/login");
        } else {
            setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
            const data = await axios.get(
                `${getAllUsers}/${currentUser._id}`
            );
            setContacts(await data.data);
            console.log('chat: contact set');
        }
    }

    useEffect(() => {
        console.log(123);
        fetchData();
    }, [])

    const handleChatChange = async (chat) => {
        console.log('chat handlechat change 1st', chat);
        setCurrentChat(chat);
        const a = await setCurrentChat(prev => {
            console.log('read prev', prev);
            return prev
        })
        console.log('chat handlechatchange 2nd', currentChat);
    }

    useEffect(() => {
        if (currentUser) {
            console.log('123');
            console.log('io host', currentUser, 'host ' + host);
            socket.current = io(host);
            socket.current.emit("add-user", currentUser._id);
        }
    }, [currentUser])

    return (
        <>
            <Container>
                <div className='container'>
                    {
                        isLoaded === false ? '' : <Contacts contacts={contacts} currentUser={currentUser} handleChatChange={handleChatChange} />
                    }
                    {
                        isLoaded === false ? '' : (
                            currentChat === undefined ? <Welcome
                                currentUser={currentUser}
                            /> : <ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket} />
                        )

                    }
                </div>
            </Container>
        </>
    )
}

const Container = styled.div`
 height: 100vh;
 width: 100vw;
 display: flex;
 flex-direction: column;
 justify-content: center;
 gap: 1rem;
 align-items: center;
 background-color: #131324;
 .container {
    height: 85vh;
    width: 85vw;
    background-color:  #080420;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width:720px) and (max-width:1080px) {
        grid-template-columns: 35% 65%;
    }
 }
`;

