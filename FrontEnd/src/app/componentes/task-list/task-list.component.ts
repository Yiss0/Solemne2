import { Component } from '@angular/core';
import { TaskItemComponent } from '../task-item/task-item.component';
import { TaskAlertComponent } from '../task-alert/task-alert.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-list',
  imports: [TaskItemComponent, TaskAlertComponent, CommonModule,],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {
  formulario: boolean = false;
  date: string = "";

  nuevaTarea : {
    titulo: string,
    descripcion: string,
    prioridad: string,
    fechaVencimiento: string
  } = {
    titulo:'',
    descripcion: '',
    prioridad: '',
    fechaVencimiento: ''
  };

  constructor() {
    this.date = this.ahora();
  }

  Formulario(): void {
    this.formulario = !this.formulario;

    //vaciar formulario anterior
    if (this.formulario) {
      this.nuevaTarea = {
        titulo: '',
        descripcion: '',
        prioridad: '',
        fechaVencimiento: ''
      };
    }
  }

  private ahora(): string {
    const hoy = new Date();
    const año = hoy.getFullYear();
    const mes = ('0' + (hoy.getMonth() + 1)).slice(-2);
    const dia = ('0' + hoy.getDate()).slice(-2);
    return `${año}-${mes}-${dia}`;
  }
}
