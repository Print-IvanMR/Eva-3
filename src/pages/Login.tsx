import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulación de login 
    if (email === 'admin@iglesia.cl' && password === '123456') {
      login({ id: '1', nombre: 'Pastor Principal', rol: 'Admin' });
      navigate('/'); // Redirige al Dashboard
    } else {
      alert('Las credenciales son incorrectas. Inténtalo de nuevo.');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1 style={{ color: '#d4af37' }}>Intranet - Como en el Cielo</h1>
      <p>Inicie sesión para gestionar la congregación</p>
      
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', width: '300px', margin: '0 auto', gap: '15px' }}>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Correo Electrónico" 
          required 
          style={{ padding: '10px' }}
        />
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Contraseña" 
          required 
          style={{ padding: '10px' }}
        />
        <button type="submit" style={{ padding: '10px', backgroundColor: '#d4af37', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>
          Entrar
        </button>
      </form>
    </div>
  );
};