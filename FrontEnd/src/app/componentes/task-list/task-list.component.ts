import { Component } from '@angular/core';
import { TaskItemComponent } from '../task-item/task-item.component';
import { TaskAlertComponent } from '../task-alert/task-alert.component';

@Component({
  selector: 'app-task-list',
  imports: [TaskItemComponent, TaskAlertComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {

}
