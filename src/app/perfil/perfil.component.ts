import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { Usuario } from 'src/models/Usuario';
import { HtmlParser } from '@angular/compiler';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {

  objUsuario;

  constructor(private http: HttpClient, private auth: AuthService) { 
    this.objUsuario = new Usuario();
  }

  ngOnInit(): void {
    this.cargarDatosPerfil(); 
  }


  editarLapiz(){
    // Obtén una referencia al elemento de la imagen
  const imagenLapiz = document.getElementById("imagenLapiz");

// Obtén una referencia a los elementos de input que deseas habilitar
  const inputs = document.querySelectorAll(".box");


  // Itera a través de los elementos de input y quita el atributo "readonly"
  inputs.forEach((input) => {
    input.removeAttribute("readonly");
  });

  }


  cambiarContra(){
    const nombresSpan = document.getElementById("NombreSpan") as HTMLElement;
    const dniSpan = document.getElementById("DniSpan") as HTMLElement;
    const correoSpan = document.getElementById("CorreoSpan") as HTMLElement;
    const apellidoSpan= document.getElementById("ApellidoSpan") as HTMLElement;
    const tipoUsuarioSpan = document.getElementById("TipoUsuarioSpan") as HTMLElement;
    const contraSpan = document.getElementById("ContraSpan") as HTMLElement;
    const tipoUsuarioInput = document.getElementById("tipoUsuario") as HTMLInputElement;
    const apellidoInput = document.getElementById("apellidos")as HTMLInputElement;
    const nameInput = document.getElementById("name") as HTMLInputElement;
    const dniInput = document.getElementById("dni") as HTMLInputElement;
    const correoInput = document.getElementById("correoElectronico") as HTMLInputElement;

    if (nombresSpan && dniSpan && correoSpan && nameInput && dniInput && correoInput) {
      nombresSpan.innerText = "Contraseña antigua";
      dniSpan.innerText = "Contraseña nueva";
      correoSpan.innerText = "Repetir contraseña";
      tipoUsuarioSpan.innerText = " ";
      contraSpan.innerText = " ";
      apellidoSpan.innerText = " ";
      tipoUsuarioInput.setAttribute("type", "hidden");
      apellidoInput.setAttribute("type", "hidden");
      nameInput.setAttribute("name", "contrasena");
      dniInput.setAttribute("name", "contrasena2");
      correoInput.setAttribute("name", "contrasena3");
    }

    const volverButton = document.querySelector(".volver") as HTMLElement;
    if (volverButton) {
      volverButton.style.display = "none";
    }

    const contraButton = document.querySelector("#contra") as HTMLElement;
    if (contraButton) {
      contraButton.style.display = "none";
    }

  
  }

  mostrar(){
    console.log(this.objUsuario);
  }

  cargarDatosPerfil(){
    
    const id = this.auth.valoresToken.userId;
    const url = `https://proyceapi.fly.dev/api/proyce/users/${id}`;
    //const url = 'https://proyceapi.fly.dev/api/proyce/user'; // Reemplaza con la URL de tu servidor
    
    // Envía el objeto objUsuario como JSON en el cuerpo de la solicitud GET
    this.http.get(url).subscribe(
        (data:any) => {
          // Maneja la respuesta del servidor aquí
          if(data){
            this.objUsuario = data;
          }else{
            
            alert("Error1.")
          }
          

        },
        (error) => {
          // Maneja los errores aquí
          console.error('Error al enviar la solicitud:', error);
        }
      );
  }


  actualizarPerfil(){
    console.log(this.objUsuario)
    this.objUsuario.idUsuarioAccion = this.auth.valoresToken.userId;
    const url = `https://proyceapi.fly.dev/api/proyce/user/${this.auth.valoresToken.userId}`; // Reemplaza con la URL de tu API

    this.http.patch(url, this.objUsuario).subscribe(
      (response) => {
        // Manejar la respuesta de la solicitud POST, si es necesario
        console.log('Solicitud PATCH exitosa', response);
      },
      (error) => {
        // Manejar errores en la solicitud POST
        console.error('Error en la solicitud POST', error);
      }
    );
  }
}
