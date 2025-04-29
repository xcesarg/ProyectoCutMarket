import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

export interface Product {
  id: number;
  titulo: string;
  descripcion: string;
  precio: number;
  estado: string;
  creado_en: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private API_URL = `${environment.apiUrl}/products`;

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.API_URL);
  }
}
