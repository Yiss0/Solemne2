import { Component, Input } from '@angular/core';
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
