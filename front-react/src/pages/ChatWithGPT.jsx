import React, { useState, useEffect, useRef } from 'react';

const ChatWithGPT = () => {
    const username = sessionStorage.getItem("username");
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([]);

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    };

    const handleSendMessage = () => {
        if (message.trim() !== '') {
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
          <h1>심심이</h1>
          <div className='chat-container' style={{ backgroundColor: 'rgb(255, 217, 142)' }}>
            <div className='chat-history' ref={scrollRef}>
              
            </div>
    
            <div className='input-area'>
                <p>{username}님 </p>
                <input
                    className='input'
                    type='text'
                    placeholder='심심이에게 메시지를 입렵해보세요'
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
    
    

export default ChatWithGPT;