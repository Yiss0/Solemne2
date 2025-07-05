import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-task-alert',
  standalone: true,
  imports: [],
  templateUrl: './task-alert.component.html',
  styleUrl: './task-alert.component.css'
})
export class TaskAlertComponent {
  @Input() cantidad: number = 0;
}
