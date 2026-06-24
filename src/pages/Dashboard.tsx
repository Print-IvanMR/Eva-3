import { useAuth } from '../context/AuthContext';

export const Dashboard = () => {
  const { usuario, logout } = useAuth();

  return (
    <div style={{ padding: '20px' }}>
      <h1>Panel de Administración</h1>
      <p>¡Bienvenido(a), <strong>{usuario?.nombre}</strong>! Tienes acceso de nivel: {usuario?.rol}.</p>
      
      <button 
        onClick={logout}
        style={{ padding: '10px 20px', backgroundColor: 'red', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '20px' }}
      >
        Cerrar Sesión
      </button>
    </div>
  );
};