import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './chat.css'


const Join = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleMessageChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePassChange = (e) => {
    setPassword(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
        handleJoin();
    }
  };

  const goToLogin = () => {
    navigate('/login')
  }

  const handleJoin = () => {
    axios
      .post('http://localhost/api/user/join', { 
        "username" : username,
        "password" : password })
        .then((response) => {
          console.log(response);
          alert("회원가입에 성공했습니다.");
          if (response.status === 201) {
            return navigate("/login");
          }
        })
        .catch((err) => {
          console.log(err.request.status);
          var errcode = err.request.status;
          if (errcode === 400) {
            alert("이미 사용중인 아이디입니다.");
          }
        });
      }

  return (
    <div className="container">
        <h1 > 회원가입 </h1>
        <div className="chat-container join" style={{ backgroundColor: '#bbd' }}>
            <input
            className="input join"
            type="text"
            placeholder="아이디를 입력하세요"
            value={username}
            onChange={handleMessageChange}
            onKeyDown={handleKeyDown}
            />
            <input
            className="input join"
            type="password"
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChange={handlePassChange}
            onKeyDown={handleKeyDown}
            />
            <div>
                <button onClick={handleJoin}>회원가입</button>
                <button onClick={goToLogin}>로그인하러가기</button>
            </div>
        </div>
    </div>
  );
};

export default Join;
