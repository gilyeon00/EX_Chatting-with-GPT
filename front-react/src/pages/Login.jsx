import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './chat.css'
import Cookies from 'js-cookie';


const Login = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleMessageChange = (e) => {
    setUsername(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  const handleLogin = () => {
    axios
      .post('http://localhost/api/user/check-username', { "username" : username })
      .then((response) => {
        if (response.data.exists) {
          sessionStorage.setItem('username', username);
          Cookies.set('userId', response.data.userId);
          alert('로그인에 성공하였습니다.')
          navigate('/home');
        } else {
          console.log('회원이 존재하지 않습니다.');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="container">
      <div className="chat-container" style={{ backgroundColor: '#bbd' }}>
        <input
          className="input"
          type="text"
          placeholder="아이디를 입력하세요"
          value={username}
          onChange={handleMessageChange}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleLogin}>전송</button>
      </div>
    </div>
  );
};

export default Login;
