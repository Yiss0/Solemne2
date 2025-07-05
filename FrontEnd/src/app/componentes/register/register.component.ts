// src/app/componentes/register/register.component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Importa FormsModule para ngModel
import { CommonModule } from '@angular/common'; // Importa CommonModule para *ngIf
import { Router, RouterLink } from '@angular/router'; // Importa Router y RouterLink para navegación
import { ApiService } from '../../servicios/api.service'; // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule, // Necesario para directivas como *ngIf
    FormsModule,    // Necesario para [(ngModel)]
    RouterLink      // Necesario para [routerLink] en el HTML
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  username!: string; // Usamos '!' para indicar que se inicializará más tarde
  password!: string;
  password2!: string;
  error: string | null = null;
  successMessage: string | null = null;

  constructor(
    private apiService: ApiService, // Inyecta el ApiService
    private router: Router          // Inyecta el Router para la navegación
  ) {}

  /**
   * Maneja el envío del formulario de registro.
   * Realiza validaciones básicas y llama al servicio de API para registrar al usuario.
   */
  onRegister(): void {
    this.error = null; // Limpia cualquier error previo
    this.successMessage = null; // Limpia cualquier mensaje de éxito previo

    // Validación básica de campos vacíos
    if (!this.username || !this.password || !this.password2) {
      this.error = 'Todos los campos son obligatorios.';
      return;
    }

    // Validación de que las contraseñas coincidan
    if (this.password !== this.password2) {
      this.error = 'Las contraseñas no coinciden.';
      return;
    }

    // Llamada al servicio de API para registrar al usuario
    this.apiService.register(this.username, this.password).subscribe({
      next: (response) => {
        // Manejo de la respuesta exitosa del backend
        console.log('Registro exitoso:', response);
        this.successMessage = '¡Cuenta creada exitosamente! Redireccionando a iniciar sesión...';
        // Redirige al usuario a la página de login después de un breve retraso
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000); // Redirige después de 2 segundos
      },
      error: (err) => {
        // Manejo de errores del backend
        console.error('Error en el registro:', err);
        if (err.error && err.error.username) {
          this.error = `Error: ${err.error.username[0]}`; // Ej: "Un usuario con ese nombre de usuario ya existe."
        } else if (err.error && err.error.password) {
          this.error = `Error: ${err.error.password[0]}`; // Ej: "La contraseña es demasiado común."
        }
        else if (err.status === 400) {
            this.error = 'Error de validación: Por favor, revisa tus datos.';
        }
        else {
          this.error = 'Ocurrió un error durante el registro. Inténtalo de nuevo.';
        }
      }
    });
  }
}
