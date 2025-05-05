// src/app/app.config.ts

import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import {
  provideHttpClient,
  withInterceptorsFromDi,
  HTTP_INTERCEPTORS
} from '@angular/common/http';

import { routes } from './app.routes';
import { AuthInterceptor } from './interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    // Mejora el rendimiento de zona para la detección de cambios
    provideZoneChangeDetection({ eventCoalescing: true }),

    // Configura el router con las rutas definidas
    provideRouter(routes),

    // Configura HttpClient standalone y permite interceptores desde DI
    provideHttpClient(withInterceptorsFromDi()),

    // Registra el interceptor de autenticación para inyectar el token en cada petición
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
};
