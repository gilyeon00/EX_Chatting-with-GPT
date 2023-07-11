import React, { useState } from 'react';
import './chat.css';

const Chat = () => {
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([]);

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    };

    const handleSendMessage = () => {
        if (message.trim() !== '') {
            setChatHistory((prevChat) => [...prevChat, message]);
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
            <div className="chat-container">
                <div className='chat-history'>
                    {chatHistory.map((msg, index) => (
                        <div className="message-bubble" key={index}>
                            {msg}
                        </div>
                    ))}
                </div>
                <div className="input-area">
                    <input
                        className="input"
                        type="text"
                        placeholder="메시지를 입력하세요"
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
