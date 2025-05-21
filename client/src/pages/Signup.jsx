import { useState, useContext } from 'react';
import api from '../api';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const { login } = useContext(AuthContext);

  const handleSubmit = async e => {
    e.preventDefault();
    await api.post('/auth/signup', { email, password: pw });
    // auto-login after signup
    const { data } = await api.post('/auth/login', { email, password: pw });
    login(data.token);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Signup</h2>
      <div className='flex-container'>
      <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
      <input placeholder="Password" type="password" value={pw} onChange={e=>setPw(e.target.value)} />
      <button type="submit">Sign Up</button>
      <Link to="/login">
        <button type="button">Login</button>
      </Link>
      </div>
    </form>
  );
}
