import { Component, OnInit, Input, SimpleChanges, OnChanges, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../../servicios/api.service';
import { Tarea } from '../task-item/task-item.interface';
import { TaskItemComponent } from '../task-item/task-item.component';
import { TaskAlertComponent } from '../task-alert/task-alert.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [TaskItemComponent, TaskAlertComponent, CommonModule, FormsModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit, OnChanges {
  @Input() filtro: any = { search: '', estados: [], prioridades: [] };
  @Output() tareasChange = new EventEmitter<Tarea[]>();

  formulario: boolean = false;
  date: string = "";
  tareas: Tarea[] = [];
  tareasFiltradas: Tarea[] = [];

  nuevoTitulo: string = '';
  nuevoDescripcion: string = '';
  nuevoPrioridad: string = '1';
  nuevoFechaVenci: string = '';

  tareaEditando: Tarea | null = null;

  tareasPorVencer: number = 0;

  constructor(private api: ApiService) {
    this.date = this.ahora();
  }

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      this.api.getTareas(token).subscribe({
        next: (data) => {
          this.tareas = data.map((t: any) => ({
            ...t,
            prioridad: this.prioridadToString(t.prioridad)
          }));
          this.aplicarFiltro(this.filtro);
          this.tareasChange.emit([...this.tareas]);
        },
        error: () => this.tareas = []
      });
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['filtro'] && this.tareas.length > 0) {
      this.aplicarFiltro(this.filtro);
    }
  }

  aplicarFiltro(filtro: any) {
    if (!filtro) filtro = { search: '', estados: [], prioridades: [] };
    let tareas = [...this.tareas];

    // Filtro por texto
    if (filtro.search && filtro.search.trim() !== '') {
      tareas = tareas.filter(t =>
        t.titulo.toLowerCase().includes(filtro.search.toLowerCase())
      );
    }

    // Filtro por estado
    if (filtro.estados && filtro.estados.length > 0) {
      tareas = tareas.filter(t => {
        const vencida = this.tareaVencida(t);
        if (filtro.estados.includes('completadas') && t.completado) return true;
        if (filtro.estados.includes('pendientes') && !t.completado && !vencida) return true;
        if (filtro.estados.includes('vencida') && vencida && !t.completado) return true;
        return false;
      });
    }

    // Filtro por prioridad
    if (filtro.prioridades && filtro.prioridades.length > 0) {
      tareas = tareas.filter(t => filtro.prioridades.includes(t.prioridad));
    }

    this.tareasFiltradas = tareas;
    this.tareasPorVencer = this.calcularTareasPorVencer();
  }

  calcularTareasPorVencer(): number {
  return this.tareas.filter(t => {
    return !t.completado && !this.tareaVencida(t);
  }).length;
}

  tareaVencida(tarea: Tarea): boolean {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    const fechaVenci = new Date(tarea.fechaVenci);
    fechaVenci.setHours(0, 0, 0, 0);
    return fechaVenci < hoy;
  }

  Formulario() {
    this.formulario = !this.formulario;
    if (!this.formulario) {
      this.resetFormulario();
    }
  }

  resetFormulario() {
    this.nuevoTitulo = '';
    this.nuevoDescripcion = '';
    this.nuevoPrioridad = '1';
    this.nuevoFechaVenci = '';
    this.tareaEditando = null;
  }

  guardarTarea(): void {
    const token = localStorage.getItem('token');
    if (!token) return;

    const tareaData = {
      titulo: this.nuevoTitulo,
      descripcion: this.nuevoDescripcion,
      prioridad: this.nuevoPrioridad,
      fechaVenci: this.nuevoFechaVenci
    };

    if (this.tareaEditando) {
      const tareaActualizada = { ...this.tareaEditando, ...tareaData };
      this.api.updateTarea(token, tareaActualizada).subscribe({
        next: (tarea) => {
          tarea.prioridad = this.prioridadToString(tarea.prioridad);
          const idx = this.tareas.findIndex(t => t.id_tarea === tarea.id_tarea);
          if (idx !== -1) {
            // Reemplazar la tarea en el array, luego crear una nueva referencia del array
            this.tareas[idx] = tarea;
            this.tareas = [...this.tareas]; // <<< Clave: Crear una nueva referencia del array
          }
          this.aplicarFiltro(this.filtro);
          this.resetFormulario();
          this.formulario = false;
          this.tareasChange.emit(this.tareas); // Emitir la nueva referencia
        },
        error: (err) => {
          alert('Error al editar la tarea');
        }
      });
    } else {
      this.api.addTarea(token, tareaData).subscribe({
        next: (tarea) => {
          tarea.prioridad = this.prioridadToString(tarea.prioridad);
          // Añadir la nueva tarea y crear una nueva referencia del array
          this.tareas = [...this.tareas, tarea]; // <<< Clave: Crear una nueva referencia del array
          this.aplicarFiltro(this.filtro);
          this.resetFormulario();
          this.formulario = false;
          this.tareasChange.emit(this.tareas); // Emitir la nueva referencia
        },
        error: (err) => {
          alert('Error al crear la tarea');
        }
      });
    }
  }

  onEditarTarea(tarea: Tarea) {
    this.tareaEditando = tarea;
    this.nuevoTitulo = tarea.titulo;
    this.nuevoDescripcion = tarea.descripcion;
    this.nuevoPrioridad = this.prioridadToBackend(tarea.prioridad).toString();
    this.nuevoFechaVenci = tarea.fechaVenci.toString();
    this.formulario = true;
  }

  onBorrarTarea(tarea: Tarea) {
    const token = localStorage.getItem('token');
    if (!token) return;
    this.api.deleteTarea(token, tarea.id_tarea).subscribe({
      next: () => {
        // Filtrar y crear una nueva referencia del array
        this.tareas = this.tareas.filter(t => t.id_tarea !== tarea.id_tarea); // <<< Clave: Crear nueva referencia
        this.aplicarFiltro(this.filtro);
        this.tareasChange.emit(this.tareas); // Emitir la nueva referencia
      },
      error: () => {
        alert('Error al eliminar la tarea');
      }
    });
  }

  onCompletarTarea(tarea: Tarea): void {
    const token = localStorage.getItem('token');
    if (!token) return;

    const tareaActualizada = { ...tarea, completado: true, prioridad: this.prioridadToBackend(tarea.prioridad) };
    this.api.updateTarea(token, tareaActualizada).subscribe({
      next: (tareaResp) => {
        tareaResp.prioridad = this.prioridadToString(tareaResp.prioridad);
        const index = this.tareas.findIndex(t => t.id_tarea === tareaResp.id_tarea);
        if (index !== -1) {
          // Reemplazar la tarea y crear una nueva referencia del array
          this.tareas[index] = tareaResp;
          this.tareas = [...this.tareas]; // <<< Clave: Crear una nueva referencia del array
          this.aplicarFiltro(this.filtro);
          this.tareasChange.emit(this.tareas); // Emitir la nueva referencia
        }
      },
      error: (err) => {
        alert('Error al completar la tarea');
      }
    });
  }

  onReabrirTarea(tarea: Tarea): void {
    const token = localStorage.getItem('token');
    if (!token) return;

    const tareaActualizada = { ...tarea, completado: false, prioridad: this.prioridadToBackend(tarea.prioridad) };
    this.api.updateTarea(token, tareaActualizada).subscribe({
      next: (tareaResp) => {
        tareaResp.prioridad = this.prioridadToString(tareaResp.prioridad);
        const index = this.tareas.findIndex(t => t.id_tarea === tareaResp.id_tarea);
        if (index !== -1) {
          // Reemplazar la tarea y crear una nueva referencia del array
          this.tareas[index] = tareaResp;
          this.tareas = [...this.tareas]; // <<< Clave: Crear una nueva referencia del array
          this.aplicarFiltro(this.filtro);
          this.tareasChange.emit(this.tareas); // Emitir la nueva referencia
        }
      },
      error: (err) => {
        alert('Error al reabrir la tarea');
      }
    });
  }

  trackById(index: number, tarea: Tarea) {
    return tarea.id_tarea;
  }

  ahora(): string {
    const hoy = new Date();
    return hoy.toISOString().split('T')[0];
  }

  prioridadToString(prioridad: string | number): string {
    if (prioridad === 0 || prioridad === '0') return 'alta';
    if (prioridad === 1 || prioridad === '1') return 'media';
    if (prioridad === 2 || prioridad === '2') return 'baja';
    return prioridad as string;
  }

  prioridadToBackend(prioridad: string): number {
    if (prioridad === 'alta') return 0;
    if (prioridad === 'media') return 1;
    if (prioridad === 'baja') return 2;
    return 1;
  }
}