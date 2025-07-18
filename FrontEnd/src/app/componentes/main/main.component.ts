import { Component } from '@angular/core';
import { TaskAlertComponent } from '../task-alert/task-alert.component';
import { TaskItemComponent } from '../task-item/task-item.component';
import { TaskListComponent } from '../task-list/task-list.component';
import { TaskReportComponent } from '../task-report/task-report.component';
import { HeaderComponent } from '../header/header.component';
import { AsideComponent } from '../aside/aside.component';
import { Tarea } from '../task-item/task-item.interface';

@Component({
  selector: 'app-main',
  imports: [TaskAlertComponent, TaskItemComponent, TaskListComponent, TaskReportComponent, HeaderComponent, AsideComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  filtro: any = { search: '', estados: [], prioridades: [] };
  tareas: Tarea[] = [];

  onFiltroChange(filtro: any) {
    this.filtro = filtro;
  }

  onTareasChange(tareas: Tarea[]) {
    this.tareas = tareas;
  }
}
