import { useState, useContext } from 'react';
import api from '../api';
import { AuthContext } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const { login } = useContext(AuthContext);

  const handleSubmit = async e => {
    e.preventDefault();
    const { data } = await api.post('/auth/login', { email, password: pw });
    login(data.token);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <div className='flex-container'>
      <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
      <input placeholder="Password" type="password" value={pw} onChange={e=>setPw(e.target.value)} />
      <button type="submit">Log In</button>
      </div>
    </form>
  );
}
