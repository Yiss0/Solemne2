export interface Tarea {
    id: number;
    titulo: string;
    descripcion: string;
    completado: boolean;
    fechaCreada: Date;
    fechaVenci: Date;
    prioridad: 'baja' | 'media' | 'alta';
}