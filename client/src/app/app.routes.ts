import { Routes } from '@angular/router';

export const routes: Routes = [
  { 
    path: '',
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./auth/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'products',                                                   // ← nueva ruta
    loadComponent: () => import('./products/products-page/products-page.component')
                         .then(m => m.ProductsPageComponent)
  },
  { 
    path: '**', 
    redirectTo: '' 
  }
];
