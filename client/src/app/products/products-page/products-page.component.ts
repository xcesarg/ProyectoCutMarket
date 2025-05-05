import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { ProductsService, Product } from '../../services/products.service';

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss']
})
export class ProductsPageComponent implements OnInit {
  private productsService = inject(ProductsService);
  private router = inject(Router);

  products: Product[] = [];
  loading = true;
  error: string | null = null;

  ngOnInit() {
    this.loadProducts();
  }

  /** Carga la lista de productos desde el servicio */
  loadProducts(): void {
    this.loading = true;
    this.productsService.getProducts().subscribe({
      next: (prods) => {
        this.products = prods;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading products', err);
        this.error = 'No se pudieron cargar los productos.';
        this.loading = false;
      }
    });
  }

  /** Sanitiza el título para generar nombres de archivo válidos */
  sanitizeTitle(title: string): string {
    return title
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]/g, '');
  }

  /** Navega al componente para añadir un nuevo producto */
  onAddProduct(): void {
    this.router.navigate(['/add-product']);
  }
}
