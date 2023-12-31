import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {

  routerOutletActive = true;
  credenciales:any = localStorage.getItem('token')



  constructor(private auth: AuthService,private router: Router) {
   
   }

   ngOnInit() {
    // Decodifica el token cuando se inicializa el componente
    if(this.credenciales){
      this.auth.decodeToken(this.credenciales);
    }
    else{
      console.log("No exite token.");
    }
    
  }

  
   prueba(){
    this.auth.decodeToken(this.credenciales);
   }

   
   tienePermiso(permiso: number): boolean {
    if(this.auth.valoresToken != null){
      const permisos = this.auth.valoresToken.permisos;
    for (let i = 0; i < permisos.length; i++) {
        if (permisos[i].idFuncionalidad === permiso) {
            return true;
        }
    }
    }
    return false;
  }

  cerrarSesion() {
    this.auth.logout();
    localStorage.clear();
    this.router.navigate(['/login']); // Redirige a la página de inicio de sesión

    setTimeout(() => {
      location.reload(); // Recarga la página después de 2 segundos
    }, 10); // 2000 milisegundos = 2 segundos
}


   irLogin(){
    
    this.router.navigate(['/login']);
   }

   irCancha(){
    this.router.navigate(['home/reservacancha']);

   }
   irPiscina(){
    this.router.navigate(['home/reservapiscina']);

   }

   irReservas(){
    this.router.navigate(['home/misreservas']);

   }

   irSalon(){
    this.router.navigate(['home/reservasalon']);

   }

   irPerfil(){

    if(this.auth.valoresToken != null){
      const permisos = this.auth.valoresToken.userId;
    }

   }
}
