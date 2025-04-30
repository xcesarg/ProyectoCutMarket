import { Component, OnInit } from '@angular/core';
import { ProductsService, Product } from '../../services/products.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss']
})
export class ProductsPageComponent implements OnInit {
  products: Product[] = [];
  loading = true;
  error: string | null = null;

  constructor(private productsService: ProductsService) {}

  ngOnInit() {
    this.productsService.getProducts().subscribe({
      next: prods => {
        this.products = prods;
        this.loading = false;
      },
      error: err => {
        console.error('Error loading products', err);
        this.error = 'No se pudieron cargar los productos.';
        this.loading = false;
      }
    });
  }

  // Método para sanitizar el título y generar el nombre adecuado de la imagen
  sanitizeTitle(title: string): string {
    return title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
  }
}
