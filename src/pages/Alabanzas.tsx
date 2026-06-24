import { useState, useEffect } from 'react';
import type { Alabanza } from '../types';

export const Alabanzas = () => {
  const [alabanzas, setAlabanzas] = useState<Alabanza[]>([]);
  const [formData, setFormData] = useState<Alabanza>({ id: '', nombre: '', autor: '', tematica: '', duracion: '', link: '' });

  useEffect(() => {
    const datos = localStorage.getItem('iglesia_alabanzas');
    if (datos) setAlabanzas(JSON.parse(datos));
  }, []);

  useEffect(() => {
    localStorage.setItem('iglesia_alabanzas', JSON.stringify(alabanzas));
  }, [alabanzas]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAlabanzas([...alabanzas, { ...formData, id: Date.now().toString() }]);
    setFormData({ id: '', nombre: '', autor: '', tematica: '', duracion: '', link: '' });
  };

  const eliminar = (id: string) => {
    if (window.confirm('¿Seguro que deseas eliminar esta alabanza?')) {
      setAlabanzas(alabanzas.filter(a => a.id !== id));
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ color: '#d4af37' }}>Lista de Alabanzas para el Culto</h2>
      
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '10px', maxWidth: '400px', marginBottom: '20px' }}>
        <input value={formData.nombre} onChange={e => setFormData({...formData, nombre: e.target.value})} placeholder="Nombre de la canción" required />
        <input value={formData.autor} onChange={e => setFormData({...formData, autor: e.target.value})} placeholder="Autor (Ej. Miel San Marcos)" required />
        <input value={formData.tematica} onChange={e => setFormData({...formData, tematica: e.target.value})} placeholder="Temática (Ej. Júbilo, Adoración)" required />
        <input value={formData.duracion} onChange={e => setFormData({...formData, duracion: e.target.value})} placeholder="Duración (Ej. 05:30)" required />
        <input type="url" value={formData.link} onChange={e => setFormData({...formData, link: e.target.value})} placeholder="Link (YouTube/Spotify)" required />
        <button type="submit" style={{ backgroundColor: '#d4af37', padding: '10px' }}>Guardar Alabanza</button>
      </form>

      <ul>
        {alabanzas.map(a => (
          <li key={a.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
            <strong>{a.nombre}</strong> - {a.autor} <br/>
            Temática: {a.tematica} | Duración: {a.duracion} <br/>
            <a href={a.link} target="_blank" rel="noreferrer">🎵 Escuchar</a> <br/>
            <button onClick={() => eliminar(a.id)} style={{ marginTop: '5px' }}>🗑️ Borrar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};