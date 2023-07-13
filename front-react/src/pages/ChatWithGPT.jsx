import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const ChatWithGPT = () => {
    const username = sessionStorage.getItem("username");
    const [message, setMessage] = useState('안녕 너의 소개를 해줘');
    const [chatHistory, setChatHistory] = useState([]);
    const eventSource = new EventSource('http://localhost:8888/completionChat');
   
    useEffect(() => {
        eventSource.onmessage = (event) => {
            console.log(event.data)
            setChatHistory((history) => [...history, event.data]);
        };

        return () => {
            eventSource.close();
        };
    }, []);


    const scrollRef = useRef();
    useEffect(() => {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }, [chatHistory])

    return (
        <div className='container'>
          <div className='chat-container' style={{ backgroundColor: 'rgb(255, 217, 142)' , width: "90%", height: "70%"}}>
            <div className='chat-history' ref={scrollRef}>
                {chatHistory.map((chat, index) => <p key={index}>{chat}</p>)}
            </div>
          </div>
        </div>
    );
};

export default ChatWithGPT;
