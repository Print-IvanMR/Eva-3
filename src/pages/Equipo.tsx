import { useState, useEffect } from 'react';
import type { MiembroEquipo } from '../types';

export const Equipo = () => {
  const [miembros, setMiembros] = useState<MiembroEquipo[]>([]);
  const [filtro, setFiltro] = useState('');
  const [editando, setEditando] = useState(false);
  const [formData, setFormData] = useState<MiembroEquipo>({ id: '', nombre: '', apellido: '', rol: '', telefono: '', correo: '' });

  // Cargar datos al iniciar
  useEffect(() => {
    const datos = localStorage.getItem('iglesia_equipo');
    if (datos) setMiembros(JSON.parse(datos));
  }, []);

  // Guardar datos cada vez que 'miembros' cambie
  useEffect(() => {
    localStorage.setItem('iglesia_equipo', JSON.stringify(miembros));
  }, [miembros]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editando) {
      setMiembros(miembros.map(m => m.id === formData.id ? formData : m));
      setEditando(false);
    } else {
      setMiembros([...miembros, { ...formData, id: Date.now().toString() }]);
    }
    setFormData({ id: '', nombre: '', apellido: '', rol: '', telefono: '', correo: '' });
  };

  const eliminar = (id: string) => {
    if (window.confirm('¿Seguro que deseas eliminar a este miembro?')) {
      setMiembros(miembros.filter(m => m.id !== id));
    }
  };

  const editar = (miembro: MiembroEquipo) => {
    setFormData(miembro);
    setEditando(true);
  };

  const filtrados = miembros.filter(m => m.nombre.toLowerCase().includes(filtro.toLowerCase()) || m.rol.toLowerCase().includes(filtro.toLowerCase()));

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ color: '#d4af37' }}>Gestión de Equipo</h2>
      
      {/* Formulario */}
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '10px', maxWidth: '400px', marginBottom: '30px' }}>
        <input name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Nombre" required />
        <input name="apellido" value={formData.apellido} onChange={handleChange} placeholder="Apellido" required />
        <select name="rol" value={formData.rol} onChange={handleChange} required>
          <option value="">Seleccione Rol...</option>
          <option value="Pastor">Pastor</option>
          <option value="Líder">Líder</option>
          <option value="Músico">Músico</option>
        </select>
        <input name="telefono" value={formData.telefono} onChange={handleChange} placeholder="Teléfono" required />
        <input name="correo" type="email" value={formData.correo} onChange={handleChange} placeholder="Correo" required />
        <button type="submit" style={{ backgroundColor: '#d4af37', padding: '10px', cursor: 'pointer' }}>
          {editando ? 'Actualizar Miembro' : 'Registrar Miembro'}
        </button>
      </form>

      {/* Buscador y Tabla */}
      <input 
        type="text" 
        placeholder="Buscar por nombre o rol..." 
        value={filtro} 
        onChange={(e) => setFiltro(e.target.value)} 
        style={{ padding: '5px', marginBottom: '10px', width: '300px' }}
      />
      <table border={1} width="100%" style={{ borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr style={{ backgroundColor: '#f4f4f4' }}>
            <th>Nombre</th><th>Rol</th><th>Teléfono</th><th>Correo</th><th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filtrados.map(m => (
            <tr key={m.id}>
              <td>{m.nombre} {m.apellido}</td>
              <td>{m.rol}</td>
              <td>{m.telefono}</td>
              <td>{m.correo}</td>
              <td>
                <button onClick={() => editar(m)}>✏️ Editar</button>
                <button onClick={() => eliminar(m.id)}>🗑️ Borrar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};