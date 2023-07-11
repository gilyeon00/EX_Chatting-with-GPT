import React from 'react';
import './chat.css' 

const Chat = () => {
    return (
        <div className='container'>
            <h1>1:1 채팅</h1>
            <div className="chat-container">
                <div className='chat-history'>

                </div>
                {/* 메시지 입력 및 전송 영역 */}
                <div className="input-area">
                    <input className="input" type="text" placeholder="메시지를 입력하세요" />
                    <button>전송</button>
                </div>
            </div>
        </div>
    );
};

export default Chat;
