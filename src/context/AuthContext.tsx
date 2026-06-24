import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Usuario } from '../types'; 

interface AuthContextType {
  usuario: Usuario | null;
  login: (datosUsuario: Usuario) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  // Carga la sesión al abrir la página
  useEffect(() => {
    const sesionGuardada = localStorage.getItem('iglesia_sesion');
    if (sesionGuardada) {
      setUsuario(JSON.parse(sesionGuardada));
    }
  }, []);

  const login = (datosUsuario: Usuario) => {
    setUsuario(datosUsuario);
    localStorage.setItem('iglesia_sesion', JSON.stringify(datosUsuario));
  };

  const logout = () => {
    setUsuario(null);
    localStorage.removeItem('iglesia_sesion');
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};