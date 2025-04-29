import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatCheckboxModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    rememberMe: [false]
  });

  hidePassword = true;

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password, rememberMe } = this.loginForm.value;
      
      this.authService.login({
        correo: email!,
        contrasena: password!
      }).subscribe({
        next: (res) => {
          // Si el usuario marcó "Recordar mi cuenta"
          if (rememberMe) {
            localStorage.setItem('email', email!);
          }
          
          localStorage.setItem('token', res.token);
          
          // Intentemos usar timeout para asegurar que el token esté guardado
          setTimeout(() => {
            this.router.navigate(['/products']).then(
              success => {
                if (!success) {
                  console.error('Navegación fallida hacia /products');
                  // Como fallback intentamos ir al dashboard o home
                  this.router.navigate(['/']);
                }
              }
            );
          }, 100);
        },
        error: (err) => {
          console.error('Error login:', err);
          // Aquí podrías mostrar un snackbar o mensaje de error
        }
      });
    }
  }
}