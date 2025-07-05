// src/app/guards/auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from '../servicios/api.service'; // Asegúrate de que la ruta sea correcta

@Injectable({
  providedIn: 'root' // Esto hace que el guard esté disponible en toda la aplicación
})
export class AuthGuard implements CanActivate {

  constructor(private apiService: ApiService, private router: Router) {}

  /**
   * @param route
   * @param state
   * @returns 
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.apiService.isAuthenticated()) {
      return true;
    } else {
      console.warn('Acceso denegado: Usuario no autenticado. Redirigiendo a /login.');
      return this.router.createUrlTree(['/login']); // Redirige a la ruta de login
    }
  }
}
