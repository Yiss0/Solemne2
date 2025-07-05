import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Importar Router
import { ApiService } from '../../servicios/api.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent {

  constructor(private router: Router, private apiService: ApiService) {}

  cerrarSesion(): void {
    this.apiService.logout().subscribe({
      next: () => {
        localStorage.removeItem('token');
        console.log('Sesión cerrada y token eliminado.');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Error al cerrar sesión en el backend, pero eliminando token local:', err);
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      }
    });
  }
}
