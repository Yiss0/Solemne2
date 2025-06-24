import { Component } from '@angular/core';
import { HeaderComponent } from './componentes/header/header.component';
import { AsideComponent } from './componentes/aside/aside.component';
import { TaskListComponent } from './componentes/task-list/task-list.component';
import { TaskItemComponent } from './componentes/task-item/task-item.component';
import { TaskAlertComponent } from './componentes/task-alert/task-alert.component';
import { TaskReportComponent } from './componentes/task-report/task-report.component';
import { LoginComponent } from './componentes/login/login.component';
import { RouterModule } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports :[HeaderComponent, AsideComponent, TaskListComponent, TaskItemComponent, TaskListComponent, TaskReportComponent, LoginComponent, RouterModule, RouterOutlet, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {


}
