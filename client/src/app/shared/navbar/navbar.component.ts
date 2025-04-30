// src/app/shared/navbar/navbar.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <mat-toolbar color="primary">
      <a routerLink="/" class="logo-link">CutMarket</a>
      <span class="spacer"></span>
      <ng-container *ngIf="!isLoggedIn()">
        <button mat-button routerLink="/login">
          <mat-icon>login</mat-icon>
          Iniciar Sesión
        </button>
        <button mat-button routerLink="/register">
          <mat-icon>person_add</mat-icon>
          Registrarse
        </button>
      </ng-container>
      <ng-container *ngIf="isLoggedIn()">
        <button mat-button routerLink="/products">
          <mat-icon>shopping_cart</mat-icon>
          Productos
        </button>
        <button mat-button (click)="logout()">
          <mat-icon>logout</mat-icon>
          Cerrar Sesión
        </button>
      </ng-container>
    </mat-toolbar>
  `,
  styles: [`
    .spacer {
      flex: 1 1 auto;
    }
    .logo-link {
      text-decoration: none;
      color: white;
      font-size: 1.5rem;
      font-weight: bold;
    }
  `]
})
export class NavbarComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
}