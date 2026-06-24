import { useState, useEffect } from 'react';
import type { Evento } from '../types';

export const Eventos = () => {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [editando, setEditando] = useState(false);
  const [formData, setFormData] = useState<Evento>({ id: '', nombre: '', fecha: '', hora: '', encargado: '', lugar: '' });

  useEffect(() => {
    const datos = localStorage.getItem('iglesia_eventos');
    if (datos) setEventos(JSON.parse(datos));
  }, []);

  useEffect(() => {
    localStorage.setItem('iglesia_eventos', JSON.stringify(eventos));
  }, [eventos]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editando) {
      setEventos(eventos.map(ev => ev.id === formData.id ? formData : ev));
      setEditando(false);
    } else {
      setEventos([...eventos, { ...formData, id: Date.now().toString() }]);
    }
    setFormData({ id: '', nombre: '', fecha: '', hora: '', encargado: '', lugar: '' });
  };

  const eliminar = (id: string) => {
    if (window.confirm('¿Cancelar este evento?')) {
      setEventos(eventos.filter(ev => ev.id !== id));
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ color: '#d4af37' }}>Agenda de Eventos</h2>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '10px', maxWidth: '400px', marginBottom: '30px' }}>
        <input name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Nombre del Evento (Ej. Culto)" required />
        <input name="fecha" type="date" value={formData.fecha} onChange={handleChange} required />
        <input name="hora" type="time" value={formData.hora} onChange={handleChange} required />
        <input name="encargado" value={formData.encargado} onChange={handleChange} placeholder="Encargado" required />
        <input name="lugar" value={formData.lugar} onChange={handleChange} placeholder="Lugar" required />
        <button type="submit" style={{ backgroundColor: '#d4af37', padding: '10px' }}>
          {editando ? 'Actualizar Evento' : 'Crear Evento'}
        </button>
      </form>

      <ul>
        {eventos.map(ev => (
          <li key={ev.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
            <strong>{ev.nombre}</strong> - {ev.fecha} a las {ev.hora} Hrs <br/>
            📍 {ev.lugar} | 👤 {ev.encargado} <br/>
            <button onClick={() => { setFormData(ev); setEditando(true); }}>Editar</button>
            <button onClick={() => eliminar(ev.id)}>Cancelar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};