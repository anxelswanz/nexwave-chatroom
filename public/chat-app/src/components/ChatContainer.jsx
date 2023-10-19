import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import Logout from './Logout';
import ChatInput from './ChatInput';
import { sendMessageRoute, getMessageRoute } from '../utils/ApiRoutes';
import axios from 'axios';
export default function ChatContainer(props) {
    const scrollRef = useRef();
    const [messages, setMessages] = useState([]);
    const [currentChat, setCurrentChat] = useState();
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const socket = props.socket;


    useEffect(() => {
        console.log('子组件effect调用，currentChat =>', props.currentChat);
        setCurrentChat(props.currentChat);
    })

    useEffect(() => {

        console.log('第二个useEffect被调用', currentChat);
        if (currentChat) {
            const asyncFunc = async () => {
                const response = await axios.post(getMessageRoute, {
                    from: props.currentUser._id,
                    to: currentChat._id,
                })
                console.log('data =>', response.data);
                setMessages(response.data);
            };
            asyncFunc();
        }

    }, [currentChat])

    const handleSendMsg = async (msg) => {

        console.log('enter handlesendmsg');
        await axios.post(
            sendMessageRoute, {
            from: props.currentUser._id,
            to: props.currentChat._id,
            message: msg,
        }
        )

        socket.current.emit("send-message", {
            to: currentChat._id,
            from: props.currentUser._id,
            message: msg,
        })

        console.log('socket.current', socket.current);
        const msgs = [...messages];
        msgs.push({ fromSelf: true, message: msg });
        setMessages(msgs);
    }



    useEffect(() => {
        if (socket.current) {
            socket.current.on("msg-receive", (data) => {
                console.log(data);
                console.log('useeffect msg-receive', data);
                setArrivalMessage({ fromSelf: false, message: data.message });
            })
        }
    }, [])

    useEffect(() => {
        arrivalMessage && setMessages((prev) => [...prev, arrivalMessage])
    }, [arrivalMessage])


    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
    }, [messages])


    return (
        <Container>
            <div className="chat-header">
                <div className="user-details">
                    <div className="avatar">
                        <img src={`data:image/svg+xml;base64,${props.currentChat.avatarImage}`} />
                    </div>
                    <div className="username">
                        <h3>{props.currentChat.username}</h3>
                    </div>
                </div>
                <Logout />
            </div>
            <div className="chat-message">
                {
                    messages.map((message) => {
                        return (
                            <div>
                                <div className={`message ${message.fromSelf ? "sended" : "received"}`}>
                                    <div className="content">
                                        <p>
                                            {message.message}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className="chat-input">

                <ChatInput handleSendMsg={handleSendMsg} />
            </div>

        </Container>
    )
}

const Container = styled.div`
    padding-top: 1rem;
    display: grid;
    grid-template-rows: 12% 78% 20%;
    overflow: hidden;
    .chat-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 2rem;
        .user-details {
            display: flex;
            align-items: center;
            gap: 1rem;
            .avatar {
                img {
                    height:4rem;
                }
            }
            .username {
                h3 {
                    color: white;
                }
            }
        }
    }
    .chat-message {
        padding:1rem 2rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        overflow: auto;
        .message {
            display: flex;
            align-items: center;
            .content {
                max-width: 40%,
                overflow-wrap: break-word,
                padding: 1rem;
                font-size: 1.1rem;
                color: #d1d1d1;
            }
          
        }
        &::-webkit-scrollbar {
            width: 0.2rem;
            &-thumb {
                background-color: #ffffff39;
                width: 0.1rem;
                border-radius: 1rem;
            }
        }
        .sended {
            justify-content: flex-end;
            .content {
                padding: 0 0.6rem;
                padding-top: 0.8rem;
                display: flex;
                align-items: center;
                border-radius: 1rem;
                background-color: #4f04ff21;
            }
        }
        .received {
            justify-content: flex-start;
            .content {
                padding: 0 0.6rem;
                padding-top: 0.8rem;
                display: flex;
                align-items: center;
                border-radius: 1rem;
                background-color: #9900ff20;
            }
        }
    }
`
