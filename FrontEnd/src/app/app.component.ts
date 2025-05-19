import { Component } from '@angular/core';
import { HeaderComponent } from './componentes/header/header.component';
import { AsideComponent } from './componentes/aside/aside.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { TaskListComponent } from './componentes/task-list/task-list.component';
import { TaskItemComponent } from './componentes/task-item/task-item.component';

@Component({
  selector: 'app-root',
  imports :[HeaderComponent, AsideComponent, FooterComponent, TaskListComponent, TaskItemComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
}
