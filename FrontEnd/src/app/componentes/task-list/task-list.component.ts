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

  constructor(private api: ApiService) {
    this.date = this.ahora();
  }

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      this.api.getTareas(token).subscribe({
        next: (data) => this.tareas = data,
        error: () => this.tareas = []
      });
    }
  }

  guardarTarea(): void {
    const token = localStorage.getItem('token');
    if (!token) return;

    const nuevaTarea = {
      titulo: this.nuevoTitulo,
      descripcion: this.nuevoDescripcion,
      prioridad: this.nuevoPrioridad,
      fechaVenci: this.nuevoFechaVenci
    };

    this.api.addTarea(token, nuevaTarea).subscribe({
      next: (tarea) => {
        console.log('Completar tarea:', tarea);
        this.tareas.push(tarea);
        this.formulario = false;
        this.nuevoTitulo = '';
        this.nuevoDescripcion = '';
        this.nuevoPrioridad = '1';
        this.nuevoFechaVenci = '';
      },
      error: (err) => {
        alert('Error al crear la tarea');
      }
    });
  }

  Formulario(): void {
    this.formulario = !this.formulario;
  }

  onEditarTarea(tarea: Tarea): void {
    console.log('Completar tarea:', tarea);
    const token = localStorage.getItem('token');
    if (!token) return;

    this.api.updateTarea(token, tarea).subscribe({
      next: () => {
        const index = this.tareas.findIndex(t => t.id_tarea === tarea.id_tarea);
        if (index !== -1) {
          this.tareas[index] = tarea;
        }
      },
      error: (err) => {
        alert('Error al editar la tarea');
      }
    });
  }

  onBorrarTarea(tarea: Tarea) {
    console.log('Completar tarea:', tarea);
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
    console.log('Completar tarea:', tarea);
    const token = localStorage.getItem('token');
    if (!token) return;

    tarea.completado = !tarea.completado;
    this.api.updateTarea(token, tarea).subscribe({
      next: () => {
        const index = this.tareas.findIndex(t => t.id_tarea === tarea.id_tarea);
        if (index !== -1) {
          this.tareas[index] = tarea;
        }
      },
      error: (err) => {
        alert('Error al completar la tarea');
      }
    });
  }

  onReabrirTarea(tarea: Tarea): void {
    console.log('Completar tarea:', tarea);
    const token = localStorage.getItem('token');
    if (!token) return;

    tarea.completado = false;
    this.api.updateTarea(token, tarea).subscribe({
      next: () => {
        const index = this.tareas.findIndex(t => t.id_tarea === tarea.id_tarea);
        if (index !== -1) {
          this.tareas[index] = tarea;
        }
      },
      error: (err) => {
        alert('Error al reabrir la tarea');
      }
    });
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