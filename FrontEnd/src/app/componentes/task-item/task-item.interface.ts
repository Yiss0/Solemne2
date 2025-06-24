export interface Tarea {
    id_tarea: number;
    titulo: string;
    descripcion: string;
    completado: boolean;
    fechaCreada: Date;
    fechaVenci: Date;
    prioridad: 'baja' | 'media' | 'alta';
}