import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/img/logo2.png'
export default function Contacts(props) {

    const { currentUser, contacts } = props;
    console.log(props);
    const [currentUserName, setCurrentUserName] = useState();
    const [currentUserImage, setCurrentUserImage] = useState();
    const [currentSelected, setCurrentSelected] = useState();
    const [contact, setContacts] = useState([])

    useEffect(() => {
        console.log('contacts 第一个useEffect被调用 props =>', props);
        console.log('contacts 第一个useEffect被调用 localstorage =>', JSON.parse(localStorage.getItem('chat-app-user')));
        setCurrentUserName(currentUser.username);
        setCurrentUserImage(currentUser.avatarImage);
        setContacts(contacts);
    })
    useEffect(() => {
        //setContacts(contacts);
        console.log('current user', currentUser);
        console.log('contacts current image', currentUser.avatarImage);
        console.log(contact);

    }, [currentUser, currentUserImage])

    const changeCurrentChat = (index, contact) => {
        console.log('contacts changecurrentchat', contact);
        console.log(index);
        setCurrentSelected(index);
        console.log(currentSelected === index);
        props.handleChatChange(contact);
    }
    return (
        <>

            <Container>
                <div className="brand">
                    <img src={logo} alt='Logo'
                    />
                    <h3>NEXWAVE</h3>
                </div>
                <div className="contacts">
                    {
                        contacts.map((contact, index) => {
                            return (
                                <div className={`contact ${index === currentSelected ? 'selected' : ''} `}
                                    onClick={() => changeCurrentChat(index, contact)}>
                                    <img
                                        src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                                        alt='avatar'

                                    />
                                    <div className="username">
                                        <h3>{contact.username}</h3>
                                    </div>
                                </div>
                            )
                        })
                    }


                </div>
                <div className="current-user">
                    <img
                        src={`data:image/svg+xml;base64,${currentUser.avatarImage}`}
                        alt='avatar'
                    />
                    <h2>{currentUser.username}</h2>
                </div>
            </Container>


        </>
    )
}

const Container = styled.div`
    display: grid;
    grid-template-rows: 10% 75% 15%;
    overflow: hidden;
    background-color: #080420;
    .brand {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        img {
            height:4rem;
        }
        h3 {
            color: white;
            text-transform: uppercase;
        }
    }
    
    .contacts {
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow: auto;
        gap: 0.8rem;
        &::-webkit-scrollbar {
            width: 0.2rem;
            &-thumb {
                background-color: #ffffff39;
                width: 0.1rem;
                border-radius: 1rem;
            }
        }
        .contact {
            display: flex;
            gap: 1rem;
            align-items: center;
            padding: 0.7rem;
            background-color: #ffffff39;
            min-height: 5rem;
            width: 90%;
            cursor: pointer;
            border-radius: 0.4rem;
            transition: 0.5s ease-in-out;
            img {
                height: 3rem
            }
            .username {
                color: white;
            }
        }
    }
    .selected {
        background-color: #9186f3 !important;
        border: 0.4rem solid #4e0eff;
    }

    .current-user {
        background-color: #0d0d30;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 2rem;
        border-radius: 0.5rem;
            img {
                height: 4rem;
                max-inline-size: 100%;
            }
            h2 {
                color: white;
            }
        @media screen and (min-width:720px) and (max-width:1080px) {
            gap: 0.5rem;
            h2 {
                font-size: 1rem;
            }
        }    
    }
`