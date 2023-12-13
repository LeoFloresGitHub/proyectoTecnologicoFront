import { Component,OnInit } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { Router,ActivatedRoute } from '@angular/router';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-confirmacion-correo',
  templateUrl: './confirmacion-correo.component.html',
  styleUrls: ['./confirmacion-correo.component.css']
})
export class ConfirmacionCorreoComponent {

  token: string = ''; // Aquí deberías tener el token JWT


  constructor(private http: HttpClient,private router: Router,private route: ActivatedRoute, private auth: AuthService) {
    
  }

  async ngOnInit(): Promise<void> {
    this.route.params.subscribe(async params => {
      this.token = params['token'];
  
      try {
        await this.obtenerMensaje(); // Espera a que se complete la función obtenerMensaje
        this.router.navigate(['/login']);
      } catch (error) {
        console.log("Error al decodificar el token:", error);
        // Si ocurre un error al decodificar el token, redirige al usuario a la página de inicio de sesión
        this.router.navigate(['/login']);
      }
    });
  }
  
  async obtenerMensaje(): Promise<void> {
    const apiUrl = `https://proyceapi.fly.dev/auth/confirmar/${this.token}`; // Reemplaza esto con la URL de tu API
  
    return new Promise<void>((resolve, reject) => {
      this.http.get(apiUrl).subscribe(
        (data: any) => {
          alert(data.message);
          resolve(); // Resuelve la promesa una vez que se haya completado la solicitud HTTP
        },
        (error) => {
          reject(error); // Rechaza la promesa en caso de error
        }
      );
    });
  }

}


