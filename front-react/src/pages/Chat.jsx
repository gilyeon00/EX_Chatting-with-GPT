import React, { useState, useEffect } from 'react';
import './chat.css';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import axios from 'axios';

const client = new W3CWebSocket('ws://localhost:8000/ws/chat/1');

const Chat = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const username = sessionStorage.getItem("username");

  useEffect ( () => {
    axios
        .post('http://localhost:8000/chat/check-chatroom', { 
            username: username,
            room_id: 1
        })
        .then(res => {
            console.log(res);
            client.onopen = () => {
                console.log('WebSocket Client Connected');
            };
        })
        .catch(err => {
            console.log(err);
            client.close();
        });
  }, [])

  useEffect(() => {
    // 웹소켓 연결
    // client.onopen = () => {
    //   console.log('WebSocket Client Connected');
    // };

    // 메시지 수신
    client.onmessage = (message) => {
      const data = JSON.parse(message.data);
      const newChatHistory = [...chatHistory, data.message];
      setChatHistory(newChatHistory);
    };

    // 컴포넌트 언마운트 시 웹소켓 연결 해제
    // return () => {
    //   client.close();
    // };
  }, [chatHistory]);

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (message.trim() !== '') {
      client.send(JSON.stringify({ message }));
      setMessage('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className='container'>
      <h1>1:1 채팅</h1>
      <div className='chat-container'>
        <div className='chat-history'>
          {chatHistory.map((msg, index) => (
            <div className='message-bubble' key={index}>
              {msg}
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

