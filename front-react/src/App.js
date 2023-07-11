import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Chat from './pages/Chat';
import ChatWithGPT from './pages/ChatWithGPT';

function App() {
  return (
    <div>
      <BrowserRouter>
          <Routes>
              <Route path="/chat" element={<Chat/> }/>  
              <Route path="/gpt" element={<ChatWithGPT/> }/>  
          </Routes>
      </BrowserRouter>
    </div>
  )
  
}

export default App;
