// add-product.component.ts

import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule }     from '@angular/material/input';
import { MatButtonModule }    from '@angular/material/button';
import { MatCardModule }      from '@angular/material/card';

import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    RouterLink
  ],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent {
  private fb = inject(FormBuilder);
  private productsService = inject(ProductsService);
  private router = inject(Router);

  form = this.fb.group({
    titulo:      ['', Validators.required],
    descripcion: [''],
    precio:      [null, [Validators.required, Validators.min(0.01)]]
  });

  onSubmit() {
    if (this.form.invalid) return;

    const { titulo, descripcion, precio } = this.form.getRawValue();

    if (titulo && precio != null) {
      this.productsService.addProduct({
        titulo,
        descripcion: descripcion ?? '',
        precio
      }).subscribe({
        next: (res) => {
          console.log('✅ addProduct success, response:', res);
          this.router.navigate(['/products']);
        },
        error: (err) => {
          console.error('❌ Error creando producto', err);
          alert(`Error al crear producto: ${err.message || err.statusText}`);
        }
      });
    } else {
      alert('Faltan datos requeridos');
    }
  }
}
