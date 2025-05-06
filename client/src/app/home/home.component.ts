// client/src/app/home/home.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { ProductsService, Product } from '../services/products.service';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    RouterLink
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  loading = true;
  error: string | null = null;

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.productsService.getProducts().subscribe({
      next: (prods) => {
        this.products = prods;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error cargando productos', err);
        this.error = 'No se pudieron cargar los productos.';
        this.loading = false;
      }
    });
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
  
  /**
   * Sanitiza el título del producto para usarlo como nombre de archivo de imagen
   * Esta función debe ser idéntica a la que tienes en products-page.component.ts
   */
  sanitizeTitle(title: string): string {
    // Elimina espacios y caracteres especiales, convierte a minúsculas
    return title
      .toLowerCase()
      .replace(/\s+/g, '-')       // Reemplaza espacios con guiones
      .replace(/[^\w\-]+/g, '')   // Elimina caracteres especiales
      .replace(/\-\-+/g, '-')     // Reemplaza múltiples guiones con uno solo
      .replace(/^-+/, '')         // Elimina guiones del inicio
      .replace(/-+$/, '');        // Elimina guiones del final
  }
}