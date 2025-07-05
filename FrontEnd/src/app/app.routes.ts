import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './servicios/auth.service';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./componentes/login/login.component').then(m => m.LoginComponent)
    },
    {
        path: 'app',
        loadComponent: () => import('./componentes/main/main.component').then(c => c.MainComponent),
        canActivate: [AuthGuard]
    },
    {
        path: 'register',
        loadComponent: () => import('./componentes/register/register.component').then(m => m.RegisterComponent)
    },
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: '/login',
    }
];
