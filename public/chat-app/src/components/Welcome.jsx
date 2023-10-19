import React from 'react'
import styled from "styled-components"
import talk from '../assets/img/talk.gif'
export default function Welcome(props) {
    return (
        <Container>
            <img src={talk} />
            <h1>
                Welcome, <span>{props.currentUser.username}</span>
            </h1>

        </Container>
    )
}

const Container = styled.div`
 display: flex;
 justify-content: center;
 align-items: center;
 flex-direction: column;
 color: white;
 gap: 2rem;
 img {
    height: 20rem;
 }
 span {
    color: #4e00ff;
 }

`