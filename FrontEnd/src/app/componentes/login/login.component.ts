import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../../servicios/api.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';

  constructor(private router: Router, private api: ApiService) { }

  onLogin(): void {
    this.api.login(this.username, this.password).subscribe({
      next: (res: any) => { // <--- Añade ": any" aquí
        localStorage.setItem('token', res.access);
        this.router.navigate(['/app']);
      },
      error: () => {
        this.error = 'Credenciales incorrectas';
      }
    });
  }
}