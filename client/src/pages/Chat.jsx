import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import ChatBox from '../components/ChatBox';
import './../App.css';
export default function Chat() {
  const { logout } = useContext(AuthContext);
  return (
    <div>
      <button onClick={logout}>Logout</button>
      <h2 className='flex-container'>AI Support Chat</h2>
      <ChatBox />
    </div>
  );
}
