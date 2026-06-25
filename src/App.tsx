import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { RutaProtegida } from './components/RutaProtegida';
import { Menu } from './components/Menu';

// páginas
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Equipo } from './pages/Equipo';
import { Eventos } from './pages/Eventos';
import { Peticiones } from './pages/Peticiones';
import { Alabanzas } from './pages/Alabanzas';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Ruta Pública */}
          <Route path="/login" element={<Login />} />

          {/* Rutas Privadas */}
          <Route path="/" element={<RutaProtegida><Menu /><Dashboard /></RutaProtegida>} />
          <Route path="/equipo" element={<RutaProtegida><Menu /><Equipo /></RutaProtegida>} />
          <Route path="/eventos" element={<RutaProtegida><Menu /><Eventos /></RutaProtegida>} />
          <Route path="/peticiones" element={<RutaProtegida><Menu /><Peticiones /></RutaProtegida>} />
          <Route path="/alabanzas" element={<RutaProtegida><Menu /><Alabanzas /></RutaProtegida>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;