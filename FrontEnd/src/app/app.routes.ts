import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./componentes/login/login.component').then(m => m.LoginComponent)
    },
    {
        path: 'app',
        loadComponent: () => import('./componentes/main/main.component').then(c => c.MainComponent)
    },
    {
        path: '',
        loadComponent: () => import('./componentes/login/login.component').then(m => m.LoginComponent)
    }
];
