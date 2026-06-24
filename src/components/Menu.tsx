import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Menu = () => {
  const { logout } = useAuth();

  return (
    <nav style={{ 
      backgroundColor: '#222', 
      padding: '15px 30px', 
      display: 'flex', 
      gap: '20px', 
      alignItems: 'center',
      borderBottom: '3px solid #d4af37'
    }}>
      <b style={{ color: '#d4af37', fontSize: '1.2rem', marginRight: '20px' }}>Intranet Iglesia</b>
      
      <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Inicio</Link>
      <Link to="/equipo" style={{ color: 'white', textDecoration: 'none' }}>Equipo</Link>
      <Link to="/eventos" style={{ color: 'white', textDecoration: 'none' }}>Eventos</Link>
      <Link to="/peticiones" style={{ color: 'white', textDecoration: 'none' }}>Peticiones</Link>
      <Link to="/alabanzas" style={{ color: 'white', textDecoration: 'none' }}>Alabanzas</Link>

      <button 
        onClick={logout} 
        style={{ 
          marginLeft: 'auto', 
          backgroundColor: '#cc0000', 
          color: 'white', 
          border: 'none', 
          padding: '8px 15px',
          cursor: 'pointer',
          borderRadius: '4px'
        }}>
        Cerrar Sesión
      </button>
    </nav>
  );
};