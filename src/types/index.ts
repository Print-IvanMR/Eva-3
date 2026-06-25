export interface Usuario {
  id: string;
  nombre: string;
  rol: 'Admin' | 'Pastor' | 'Lider';
}

export interface MiembroEquipo {
  id: string;
  nombre: string;
  apellido: string;
  rol: string;      
  telefono: string;
  correo: string;
}

export interface Evento {
  id: string;
  nombre: string;
  fecha: string;
  encargado: string; 
  lugar: string;
  hora: string;
}

export interface Peticion {
  id: string;
  peticion: string;  
  solicitante: string; 
  tipo: string;
}

export interface Alabanza {
  id: string;
  nombre: string;
  autor: string;
  tematica: string;
  duracion: string;
  link: string;
}