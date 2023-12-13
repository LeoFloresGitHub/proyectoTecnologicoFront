import { Component,OnInit } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { Router,ActivatedRoute } from '@angular/router';
import jwt_decode from 'jwt-decode';




@Component({
  selector: 'app-recuperar-contra',
  templateUrl: './recuperar-contra.component.html',
  styleUrls: ['./recuperar-contra.component.css']
})
export class RecuperarContraComponent implements OnInit {
  objNuevaContra: any = {
    correoElectronico: '',         
    contrasena: ''      
  };

  token: string = ''; // Aquí deberías tener el token JWT

  constructor(private http: HttpClient,private router: Router,private route: ActivatedRoute, private auth: AuthService) {
    
   }

   ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.token = params['token'];
      
  
      try {
        // Decodifica el token para acceder a sus atributos
        const decodedToken: any = jwt_decode(this.token);
        
        // Verifica si el token contiene el parámetro userId
        if (decodedToken.userId && decodedToken.exp * 1000 > Date.now()) {
          // El token contiene userId, puedes continuar con el código
          this.objNuevaContra.correoElectronico = decodedToken.correo;
        } else {
          // El token no contiene userId, redirige al usuario a la página de inicio de sesión
          this.router.navigate(['/login']);
        }
      } catch (error) {
        console.log("Error al decodificar el token:", error);
        // Si ocurre un error al decodificar el token, redirige al usuario a la página de inicio de sesión
        this.router.navigate(['/login']);
      }
    });
  }
  

   async enviarNuevaContra(){
    const url = 'https://proyceapi.fly.dev/auth/actualizar/contra';
    //const url = 'https://proyceapi.fly.dev/api/proyce/user'; // Reemplaza con la URL de tu servidor
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    
  
    // Envía el objeto objUsuario como JSON en el cuerpo de la solicitud POST
    this.http.post(url, JSON.stringify(this.objNuevaContra), { headers })
      .subscribe(
        (response) => {
          // Maneja la respuesta del servidor aquí
          console.log('Respuesta del servidor:', response);
          alert('Contraseña actualizada con éxito' );
          this.router.navigate(['/login']);
        },
        (error) => {
          // Maneja los errores aquí
          console.error('Error al cambiar la contraseña:', error);
          alert('Error al cambiar la contraseña' );
        }
      );
   }


}
