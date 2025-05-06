// client/src/app/services/products.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  ProductoID: number;
  titulo: string;
  descripcion: string;
  precio: number;
  estado: string;
  creado_en: string;
  imagen?: string; // Agregamos imagen como campo opcional
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = 'http://localhost:3000/products';

  constructor(private http: HttpClient) {}

  /**
   * Obtiene la lista de productos disponibles.
   */
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  /**
   * Crea un nuevo producto.
   * @param payload Objeto con titulo, descripcion, precio e imagen opcional.
   */
  addProduct(payload: {
    titulo: string;
    descripcion: string;
    precio: number;
    imagen?: string;
  }): Observable<{ productoId: number }> {
    return this.http.post<{ productoId: number }>(this.apiUrl, payload);
  }
}