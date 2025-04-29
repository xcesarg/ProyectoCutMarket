import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private API_URL = `${environment.apiUrl}/auth`;
  private udgRegex = /^[a-z]+\.[a-z]+[0-9]{4}@alumnos\.udg\.mx$/;

  constructor(private http: HttpClient, private router: Router) {}

  isUdgEmail(email: string): boolean {
    return this.udgRegex.test(email);
  }

  // Sólo correo y contrasena
  register(userData: {
    correo: string;
    contrasena: string;
  }) {
    if (!this.isUdgEmail(userData.correo)) {
      throw new Error('El correo debe ser de formato alumno UDG');
    }
    return this.http.post<{ message: string }>(`${this.API_URL}/register`, userData);
  }

  login(credentials: { correo: string; contrasena: string }) {
    return this.http.post<{ token: string, usuario: any }>(`${this.API_URL}/login`, credentials);
  }
}
