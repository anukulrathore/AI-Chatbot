import { useState, useRef, useEffect } from 'react';
import api from '../api';

export default function ChatBox() {
  const [history, setHistory] = useState([]);
  const [msg, setMsg] = useState('');
  const endRef = useRef();

  useEffect(() => {
    (async () => {
      const { data } = await api.get('/chat/history');
      setHistory(data);
    })();
  }, []);

  const send = async () => {
    if (!msg) return;
    const { data } = await api.post('/chat/send', { message: msg });
    setHistory(h => [...h, { messages: [{ role:'user', content: msg }, { role:'assistant', content: data.reply }] }]);
    setMsg('');
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto' }}>
      <div style={{ height: '60vh', overflowY: 'auto', border: '1px solid #ccc', padding: 8 }}>
        {history.map((chat, i) =>
          chat.messages.map((m, j) => (
            <p key={`${i}-${j}`}><strong>{m.role}:</strong> {m.content}</p>
          ))
        )}
        <div ref={endRef} />
      </div>
      <div style={{ display: 'flex', marginTop: 8 }}>
        <input
          style={{ flex: 1 }}
          value={msg}
          onChange={e => setMsg(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
          placeholder="Type your message..."
        />
        <button onClick={send}>Send</button>
      </div>
    </div>
  );
}
