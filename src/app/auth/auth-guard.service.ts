import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service'; // Suponemos que tienes un AuthService


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {

    this.authService.authToken = localStorage.getItem('token');
  }

  canActivate(): boolean {  
    
    if (this.authService.isAuthenticatedTF()) {
      
      return true;
      
    } else {
      this.router.navigate(['/login']); // Redirige al usuario a la página de inicio de sesión si no está autenticado
      return false; // El usuario no puede acceder a la ruta
    }
  }
}