import { Component, OnInit } from '@angular/core'; // <--- Añadido OnInit
import { TaskItemComponent } from '../task-item/task-item.component';
import { TaskAlertComponent } from '../task-alert/task-alert.component';
import { CommonModule } from '@angular/common';
import { Tarea } from '../task-item/task-item.interface';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [TaskItemComponent, TaskAlertComponent, CommonModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit {
  formulario: boolean = false;
  date: string = "";
  tareas: Tarea[] = [];

  ngOnInit() {
    this.tareas = [
      //Normal, prioridad alta
      {id: 1,
      titulo: 'Realizar base de datos',
      descripcion: 'diseñar y planear la base de datos',
      completado: false,
      fechaCreada: new Date('2025-06-04'),
      fechaVenci: new Date('2025-07-01'),
      prioridad: 'alta'
    },
    //Normal, prioridad media
      {id: 2,
      titulo: 'Configurar git',
      descripcion: 'realizar el github de trabajo',
      completado: false,
      fechaCreada: new Date('2025-06-01'),
      fechaVenci: new Date('2025-06-20'),
      prioridad: 'media'
    },
    //Vencida,
      {id: 3,
      titulo: 'Escoger framework de trabajo',
      descripcion: 'Plantear y escoger el framework de trabajo',
      completado: false,
      fechaCreada: new Date('2025-05-20'),
      fechaVenci: new Date('2025-06-01'),
      prioridad: 'alta'
    },
    //Completada, baja
      {id: 4,
      titulo: 'Escoger equipo de trabajo',
      descripcion: 'Escoger con que compañeros trabajar',
      completado: true,
      fechaCreada: new Date('2025-06-01'),
      fechaVenci: new Date('2025-06-20'),
      prioridad: 'baja'
    },
    ]
  }

  constructor() {
    this.date = this.ahora();
  }

  Formulario(): void {
    this.formulario = !this.formulario;
  }

  //Validación fecha
  private ahora(): string {
    const hoy = new Date();
    const año = hoy.getFullYear();
    const mes = ('0' + (hoy.getMonth() + 1)).slice(-2);
    const dia = ('0' + hoy.getDate()).slice(-2);
    return `${año}-${mes}-${dia}`;
  }

  trackById(index: number, tarea: Tarea): number {
    return tarea.id;
  }
  
}