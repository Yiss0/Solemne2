import { Component, OnInit } from '@angular/core';
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
export class TaskListComponent implements OnInit {
  formulario: boolean = false;
  date: string = "";
  tareas: Tarea[] = [];

  nuevoTitulo: string = '';
  nuevoDescripcion: string = '';
  nuevoPrioridad: string = '1';
  nuevoFechaVenci: string = '';

  tareaEditando: Tarea | null = null;

  private prioridadToString(prioridad: string): 'alta' | 'media' | 'baja' {
    switch (prioridad) {
      case '0': return 'alta';
      case '1': return 'media';
      case '2': return 'baja';
      default: return 'media';
    }
  }

  private prioridadToBackend(prioridad: string): string {
    switch (prioridad) {
      case 'alta': return '0';
      case 'media': return '1';
      case 'baja': return '2';
      default: return '1';
    }
  }

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
        },
        error: () => this.tareas = []
      });
    }
  }

  guardarTarea(): void {
    const token = localStorage.getItem('token');
    if (!token) return;

    const tareaData = {
      titulo: this.nuevoTitulo,
      descripcion: this.nuevoDescripcion,
      prioridad: this.prioridadToBackend(this.nuevoPrioridad),
      fechaVenci: this.nuevoFechaVenci
    };

    if (this.tareaEditando) {
      const tareaActualizada = { ...this.tareaEditando, ...tareaData };
      tareaActualizada.prioridad = this.prioridadToBackend(this.tareaEditando.prioridad);
      this.api.updateTarea(token, tareaActualizada).subscribe({
        next: (tarea) => {
          tarea.prioridad = this.prioridadToString(tarea.prioridad);
          const idx = this.tareas.findIndex(t => t.id_tarea === tarea.id_tarea);
          if (idx !== -1) this.tareas[idx] = tarea;
          this.resetFormulario();
        },
        error: (err) => {
          alert('Error al editar la tarea');
        }
      });
    } else {
      this.api.addTarea(token, tareaData).subscribe({
        next: (tarea) => {
          tarea.prioridad = this.prioridadToString(tarea.prioridad);
          this.tareas.push(tarea);
          this.resetFormulario();
        },
        error: (err) => {
          alert('Error al crear la tarea');
        }
      });
    }
  }

  Formulario(): void {
    this.formulario = !this.formulario;
    if (!this.formulario) this.resetFormulario();
  }

  onEditarTarea(tarea: Tarea): void {
    this.formulario = true;
    this.tareaEditando = tarea;
    this.nuevoTitulo = tarea.titulo;
    this.nuevoDescripcion = tarea.descripcion;
    this.nuevoPrioridad = tarea.prioridad;
  }

  onBorrarTarea(tarea: Tarea) {
    const token = localStorage.getItem('token');
    if (!token) return;
    this.api.deleteTarea(token, tarea.id_tarea).subscribe({
      next: () => {
        this.tareas = this.tareas.filter(t => t.id_tarea !== tarea.id_tarea);
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
          this.tareas[index] = tareaResp;
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
          this.tareas[index] = tareaResp;
        }
      },
      error: (err) => {
        alert('Error al reabrir la tarea');
      }
    });
  }

  resetFormulario() {
    this.formulario = false;
    this.tareaEditando = null;
    this.nuevoTitulo = '';
    this.nuevoDescripcion = '';
    this.nuevoPrioridad = '1';
    this.nuevoFechaVenci = '';
  }

  private ahora(): string {
    const hoy = new Date();
    const año = hoy.getFullYear();
    const mes = ('0' + (hoy.getMonth() + 1)).slice(-2);
    const dia = ('0' + hoy.getDate()).slice(-2);
    return `${año}-${mes}-${dia}`;
  }

  trackById(index: number, tarea: Tarea): number {
    return tarea.id_tarea;
  }
}