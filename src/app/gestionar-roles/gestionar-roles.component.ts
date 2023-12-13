import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from 'src/models/Usuario';
import { AuthService } from '../auth/auth.service';
import { Funcionalidad } from 'src/models/Funcionalidad';

@Component({
  selector: 'app-gestionar-roles',
  templateUrl: './gestionar-roles.component.html',
  styleUrls: ['./gestionar-roles.component.css']
})
export class GestionarRolesComponent {

  ListaUsuario: Usuario[] = [];
  ListaFuncionalidad: Funcionalidad[] = [];
  ListaPermiso: number[] = []
constructor(private http: HttpClient, private auth: AuthService){
  
}


ngOnInit(): void {
  this.cargarUsuarios(); 
  this.cargarFuncionalidades();
}

cargarUsuarios(){
    
  const url = `https://proyceapi.fly.dev/api/proyce/users`;

  this.http.get(url).subscribe(
      (data:any) => {
        // Maneja la respuesta del servidor aquí
        if(data){
         this.ListaUsuario = data;
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

cargarFuncionalidades(){
  const url = `https://proyceapi.fly.dev/api/proyce/funcionalidades`;


  this.http.get(url).subscribe(
      (data:any) => {
        // Maneja la respuesta del servidor aquí
        if(data){
          this.ListaFuncionalidad = data.map((item: any) => ({
            id: item.id!,
            nombreFuncionalidad: item.nombreFuncionalidad!
              .replace(/([A-Z])/g, ' $1') // Inserta espacios antes de letras mayúsculas
              .replace(/^\w/, (c: string) => c.toUpperCase()) // Convierte la primera letra en mayúscula
          }));
        } else {
          alert("Error1.");
        }
      },(error) => {
        // Maneja los errores aquí
        console.error('Error al enviar la solicitud:', error);
      }
    );
}


cargarFuncionalidadesXid(id: number){

  this.ListaPermiso = [];
  const url = `https://proyceapi.fly.dev/api/proyce/permisos/${id}`;


  this.http.get(url).subscribe(
    (data: any) => {
      if (Array.isArray(data) && data.length > 0) {
        this.ListaPermiso = data.map(item => item.idFuncionalidad);
        this.ListaFuncionalidad.forEach(elemento => {
          const inputCheckbox = document.getElementById(elemento.id.toString()) as HTMLInputElement;
          if (inputCheckbox) {
            // Verifica si el elemento.id está en ListaPermiso y marca/desmarca el checkbox en consecuencia
            
            if (this.ListaPermiso.includes(elemento.id)) {
              inputCheckbox.checked = true;
            } else {
              inputCheckbox.checked = false;
            }
          }
        });
      } else{
        this.ListaFuncionalidad.forEach(elemento => {
          const inputCheckbox = document.getElementById(elemento.id.toString()) as HTMLInputElement;
          if (inputCheckbox) {
            inputCheckbox.checked = false;
          }
        });
      }      
    },
    (error) => {
      console.error('Error al enviar la solicitud:', error);
    }
  );
   
}


seleccionarUsuario(event: Event) {

  const selectElement = event.target as HTMLSelectElement;
  const selectedUserId = parseInt(selectElement.value, 10);
  this.cargarFuncionalidadesXid(selectedUserId);
  
  
  
}

cambiarPermisos(){
   // Obtén el valor seleccionado del combo (select)
  const combo = document.getElementById('combo') as HTMLSelectElement;
  const valorCombo = combo.value;
  

  // Obtén los valores seleccionados de los checkboxes
  const valoresCheckboxes: string[] = [];
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  const checkboxesArray = Array.from(checkboxes);

  for (const checkbox of checkboxesArray) {
    if (checkbox instanceof HTMLInputElement && checkbox.checked) {
      valoresCheckboxes.push(checkbox.id);
    }
  }

  // Valores en ListaPermiso pero no en valoresCheckboxes
  const valoresEnListaPermisoNoEnCheckboxes = this.ListaPermiso
  .map(valor => valor.toString())
  .filter(valor => !valoresCheckboxes.includes(valor));
  // Valores en valoresCheckboxes pero no en ListaPermiso
  const valoresEnCheckboxesNoEnListaPermiso = valoresCheckboxes.filter(valor => !this.ListaPermiso.includes(parseInt(valor)));

  console.log('Valor del combo seleccionado:', valorCombo);
  console.log('Valores de los checkboxes seleccionados:', valoresCheckboxes);
  console.log('Valores en ListaPermiso pero no en valoresCheckboxes:', valoresEnListaPermisoNoEnCheckboxes);
  console.log('Valores en valoresCheckboxes pero no en ListaPermiso:', valoresEnCheckboxesNoEnListaPermiso);

  // Crear un objeto con los datos que deseas enviar
const modelo = {
  valoresDes: valoresEnListaPermisoNoEnCheckboxes,
  valoresSelec: valoresEnCheckboxesNoEnListaPermiso
};

// Especificar la URL del servidor
const url = `https://proyceapi.fly.dev/api/proyce/permisos/${valorCombo}`;

// Realizar la solicitud HTTP POST para enviar los datos
this.http.post(url, modelo).subscribe(
  (data: any) => {
    // Maneja la respuesta del servidor aquí
    if (data) {
      console.log(data);
      alert("Cambio guardado con éxito")
    } else {
      alert("Error1.");
    }
  },
  (error) => {
    // Maneja los errores aquí
    console.error('Error al enviar la solicitud:', error);
  }
);}


}











