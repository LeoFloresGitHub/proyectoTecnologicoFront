import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/models/Usuario';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../../assets/css/logine1.css']
})
export class LoginComponent {
  
  correo: string = '';
  contrasena: string = '';
  correoRecuperar :string = '';

  objUsuario!: Usuario;


  constructor(private http: HttpClient,private router: Router, private auth: AuthService) {
    this.objUsuario = new Usuario();
   }


   async signddin() {
    
      this.auth.login(this.correo, this.contrasena).subscribe(response => {
      // Verificar si el inicio de sesión fue exitoso

      
      if (response.token ) {
        // Inicio de sesión exitoso, redirigir al usuario a la página de inicio
        this.auth.isAuthenticated = true;
        this.auth.setAuthToken(response.token)
        this.router.navigate(['/home']);
      } else {
        // Inicio de sesión fallido, mostrar un mensaje de alerta
        console.log(response.message); // Imprimir el mensaje de error en la consola
        alert('Inicio de sesión fallido: ' + response.message); // Mostrar una alerta con el mensaje de error
      }
    });
  }



  
  async postuser() {

      const url = 'http://localhost:3000/api/proyce/user';
      //const url = 'https://proyceapi.fly.dev/api/proyce/user'; // Reemplaza con la URL de tu servidor
      const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });

      this.objUsuario.tipoDocumento =1;
      this.objUsuario.tipoUsuario =1;
      this.objUsuario.estado = 2;
    
      
      // Envía el objeto objUsuario como JSON en el cuerpo de la solicitud POST
      this.http.post(url, JSON.stringify(this.objUsuario), { headers })
        .subscribe(
          (response) => {
            // Maneja la respuesta del servidor aquí
            console.log('Respuesta del servidor:', response);
            alert('Usuario creado con éxito' );
            this.login();
            this.limpiar();
          },
          (error) => {
            // Maneja los errores aquí
            alert(error.error.message);
            console.error('Error al enviar la solicitud:', error.message);
          }
        );
    
  }

  async recuperarContra() {
    console.log(this.correoRecuperar);
    const url = `http://localhost:3000/auth/recuperar/${this.correoRecuperar}`;
    //const url = 'https://proyceapi.fly.dev/api/proyce/user'; // Reemplaza con la URL de tu servidor
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  
    // Envía el objeto objUsuario como JSON en el cuerpo de la solicitud GET
    this.http.get(url).subscribe(
        (response:any) => {
          // Maneja la respuesta del servidor aquí
          if(response.message){
            alert(response.message);
          }else{
            
            alert("Correo enviado con exito, porfavor cambiar contraseña y regresar a Login.")
          }
          

        },
        (error) => {
          // Maneja los errores aquí
          console.error('Error al enviar la solicitud:', error);
        }
      );
  
}




  limpiar(){
    this.objUsuario.numDocumento = '',
    this.objUsuario.correoElectronico = '',
    this.objUsuario.nombres = '',
    this.objUsuario.apellidos= '',
    this.objUsuario.contrasena = ''
  }



  //Funcionalidades de la página

  myMenuFunction() {
    var i = document.getElementById("navMenu");
    if (i?.classList.contains("nav-menu")) {
      i?.classList.add("responsive");
    } else {
      i?.classList.remove("responsive");
    }
  }

  login() {
    
    const x = document.getElementById("login");
    const y = document.getElementById("register");
    const z = document.getElementById("forget");

    if (x && y && z) {
      x.style.left = "4px";
      y.style.right = "-520px";
      const a = document.getElementById("loginBtn");
      const b = document.getElementById("registerBtn");

      if (a && b) {
        a.classList.add("white-btn");
        b.classList.remove("white-btn");
      }

      x.style.opacity = "1";
      y.style.opacity = "0";
      z.style.opacity = "0";

      const loginInput = document.querySelector('#login input[type="text"]');
      const passwordInput = document.querySelector('#login input[type="password"]');

      if (loginInput && passwordInput) {
        
      }
    }
  }

  register() {
    const x = document.getElementById("login");
    const y = document.getElementById("register");
    const z = document.getElementById("forget");

    if (x && y && z) {
      x.style.left = "-510px";
      y.style.right = "5px";
      z.style.right = "-510px";
      const a = document.getElementById("loginBtn");
      const b = document.getElementById("registerBtn");

      if (a && b) {
        a.classList.remove("white-btn");
        b.classList.add("white-btn");
      }

      x.style.opacity = "0";
      y.style.opacity = "1";
      z.style.opacity = "0";

      const registerInput = document.querySelector('#register input[type="text"]');
      const passwordInput = document.querySelector('#register input[type="password"]');

      if (registerInput && passwordInput) {
        
        registerInput.removeAttribute("readonly");
        passwordInput.removeAttribute("readonly");
      }
    }
  }

  forget() {
    const x = document.getElementById("login");
    const y = document.getElementById("register");
    const z = document.getElementById("forget");

    if (x && y && z) {
      x.style.left = "-510px";
      y.style.right = "-510px";
      z.style.right = "5px";

      x.style.opacity = "0";
      y.style.opacity = "0";
      z.style.opacity = "1";

      const forgetInput = document.querySelector('#forget input[type="text"]');

      if (forgetInput) {
        
        forgetInput.removeAttribute("readonly");
      }
    }
  }



}
