import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Tarea } from './task-item.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-item',
  imports: [CommonModule],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.css'
})
export class TaskItemComponent {
  @Input() tarea!: Tarea;
  @Output() editar = new EventEmitter<void>();
  @Output() borrar = new EventEmitter<void>();
  @Output() completar = new EventEmitter<void>();
  @Output() reabrir = new EventEmitter<void>();

  completado() {
    this.tarea.completado = !this.tarea.completado;
  }

  tareaVencida() {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    const fechaVencimiento = new Date(this.tarea.fechaVenci);
    fechaVencimiento.setHours(0, 0, 0, 0);

    return fechaVencimiento < hoy;
  }
}
