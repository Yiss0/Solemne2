import { Component } from '@angular/core';
import { HeaderComponent } from './componentes/header/header.component';
import { AsideComponent } from './componentes/aside/aside.component';
import { TaskListComponent } from './componentes/task-list/task-list.component';
import { TaskItemComponent } from './componentes/task-item/task-item.component';
import { TaskAlertComponent } from './componentes/task-alert/task-alert.component';

@Component({
  selector: 'app-root',
  imports :[HeaderComponent, AsideComponent, TaskListComponent, TaskItemComponent, TaskListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
}
