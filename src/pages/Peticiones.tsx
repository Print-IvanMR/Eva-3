import { useState, useEffect } from 'react';
import type { Peticion } from '../types';

export const Peticiones = () => {
  const [peticiones, setPeticiones] = useState<Peticion[]>([]);
  const [formData, setFormData] = useState<Peticion>({ id: '', solicitante: '', peticion: '', tipo: '' });

  useEffect(() => {
    const datos = localStorage.getItem('iglesia_peticiones');
    if (datos) setPeticiones(JSON.parse(datos));
  }, []);

  useEffect(() => {
    localStorage.setItem('iglesia_peticiones', JSON.stringify(peticiones));
  }, [peticiones]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPeticiones([...peticiones, { ...formData, id: Date.now().toString() }]);
    setFormData({ id: '', solicitante: '', peticion: '', tipo: '' }); // esto limpia el formulario
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ color: '#d4af37' }}>Peticiones de Oración</h2>
      
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '10px', maxWidth: '400px', marginBottom: '20px' }}>
        <input value={formData.solicitante} onChange={e => setFormData({...formData, solicitante: e.target.value})} placeholder="Persona que solicita" required />
        <textarea value={formData.peticion} onChange={e => setFormData({...formData, peticion: e.target.value})} placeholder="Escribe la petición..." required />
        <input value={formData.tipo} onChange={e => setFormData({...formData, tipo: e.target.value})} placeholder="Tipo (Ej. Salud, Familia, Trabajo)" required />
        <button type="submit" style={{ backgroundColor: '#d4af37', padding: '10px' }}>Enviar Petición</button>
      </form>

      <ul>
        {peticiones.map(p => (
          <li key={p.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
            <strong>{p.solicitante}</strong> solicitó oración por <strong>{p.tipo}</strong>:<br/>
            "{p.peticion}"<br/>
            <button onClick={() => setPeticiones(peticiones.filter(x => x.id !== p.id))} style={{ marginTop: '5px' }}>🗑️ Borrar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};