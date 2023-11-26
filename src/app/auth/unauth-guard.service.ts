import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service'; // Suponemos que tienes un AuthService

@Injectable({
  providedIn: 'root'
})
export class UnauthGuardService  implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {
    this.authService.authToken = localStorage.getItem('token');
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    console.log(route.data)
    console.log(route.data['requireAuthenticated'])

    if (route.data && route.data['requireAuthenticated']) {
      // Verificar si el usuario está autenticado
      if (this.authService.isAuthenticatedTF()) {
        this.router.navigate(['/home']);
        return false;
      } else {
        return true;
      }
    } else if (route.data && route.data['requirePermission']) {
      const roleId = route.data['permisoID'];
  
      // Verificar si el usuario tiene un permiso específico (por ejemplo, permiso 2)
      if (this.tienePermiso(roleId)) {
        return true;
      } else {
        this.router.navigate(['/home']);
        return false;
      }
    } else {
      // Lógica por defecto si no se especifica requireAuthenticated ni requirePermission
      return false;
    }
  }
  
  tienePermiso(permiso: number): boolean {
    
    
    const valoresTokenStr:any = localStorage.getItem('valoresToken');
    const valoresTokenObj = JSON.parse(valoresTokenStr);
    
    console.log(valoresTokenObj)
    if(valoresTokenStr != null){ 
      const permisos = valoresTokenObj.permisos;
    for (let i = 0; i < permisos.length; i++) {
        if (permisos[i].idFuncionalidad === permiso) {
            return true;
        }
    }
    }

    console.log(this.authService.valoresToken)

    return false;
  }
}