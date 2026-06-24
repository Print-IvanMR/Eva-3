import { type ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const RutaProtegida = ({ children }: { children: ReactNode }) => {
  const { usuario } = useAuth();

  // Si no hay un usuario guardado en el contexto, lo patea de vuelta al login
  if (!usuario) {
    return <Navigate to="/login" />;
  }

  // Si está logueado, lo deja ver la página
  return children;
};