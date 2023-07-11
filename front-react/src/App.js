import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Chat from './pages/Chat';
import ChatWithGPT from './pages/ChatWithGPT';
import Home from './pages/Home';
import Login from './pages/Login';

function App() {
  return (
    <div>
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Login/> }/>  
              <Route path="/home" element={<Home/> }/>  
              <Route path="/chat/1" element={<Chat/> }/>  
              <Route path="/gpt" element={<ChatWithGPT/> }/>  
          </Routes>
      </BrowserRouter>
    </div>
  )
  
}

export default App;
