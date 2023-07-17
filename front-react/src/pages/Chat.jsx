import React, { useState, useEffect, useRef } from 'react';
import './chat.css';
import axios from 'axios';


const Chat = () => {
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const username = sessionStorage.getItem("username");
    // const userId = sessionStorage.getItem("userId")
  
    const socketRef = useRef(null);  // 새로운 ref 생성

    useEffect(() => {
      axios
        .post('http://www.gilyeon.site:80/api/chat/check-chatroom', {
          username: username,
          room_id: 1
        })
        .then(res => {
            console.log(res);
            let socket = new WebSocket("ws://www.gilyeon.site/ws/chat/1/");
            socketRef.current = socket;  // socket을 ref에 저장

            socket.onopen = function(e) {
                console.log('WebSocket Client Connected');
            };
          
          socket.onmessage = function(event) {
            console.log(`Data received from server: ${event.data}`);
            setChatHistory(prevChatHistory => [...prevChatHistory, event.data]);
          };
          
          socket.onclose = function(event) {
            if (event.wasClean) {
              console.log(`Connection closed cleanly, code=${event.code} reason=${event.reason}`);
            } else {
              console.log('Connection died');
            }
          };
          
          socket.onerror = function(error) {
            console.log(`Error`, error);
            console.log(`Error ${error.message}`);
          };
        })
        .catch(err => {
          console.log(err);
        });
    }, []);


    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    };

    const handleSendMessage = () => {
        if (message.trim() !== '') {
            // WebSocket을 통해 메시지 전송
            socketRef.current.send(JSON.stringify({message: message}));
            setMessage('');
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
        handleSendMessage();
        }
    };

    const scrollRef = useRef();
      useEffect(() => {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }, [chatHistory])


  return (
    <div className='container'>
      <h1>1:1 채팅</h1>
      <div className='chat-container' style={{ backgroundColor: '#bbd' }}>
        <div className='chat-history' ref={scrollRef}>
          {chatHistory.map((msg, index) => (
            <div className='message-bubble' key={index}>
              {username} {msg}
            </div>
          ))}
        </div>

        <div className='input-area'>
            <p>{username}님 </p>
            <input
                className='input'
                type='text'
                placeholder='메시지를 입력하세요'
                value={message}
                onChange={handleMessageChange}
                onKeyDown={handleKeyDown}
            />
            <button onClick={handleSendMessage}>전송</button>
        </div>
      </div>
    </div>
  );
};

export default Chat;

