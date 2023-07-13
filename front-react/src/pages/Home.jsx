import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
    const navigate = useNavigate();

    const handleOne = (e) => {
        navigate('/chat/1');
      };

    return (
        <div className='container'>
            <div className='chat-container' style={{ backgroundColor: '#bbd' }}>
                <button onClick={handleOne}>
                    1:1 채팅
                </button>

                <button>
                    GPT와의 채팅
                </button>
            </div>
        </div>
    );
};

export default Home;