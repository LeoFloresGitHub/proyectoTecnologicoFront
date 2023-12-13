import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public authToken: string | null = null;

  public isAuthenticated: boolean = false;

  public valoresToken: any ;

  constructor(private http: HttpClient,private router: Router) { 
    this.authToken = localStorage.getItem('token')
  }


  
  login(correoForm: string, contrasenaForm: string) {
    const datos = {
      correoElectronico: correoForm,
      contrasena: contrasenaForm
    };

    
  
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  
    //const url = "https://proyceapi.fly.dev/auth/login";
    const url = "https://proyceapi.fly.dev/auth/login";
  
    return this.http.post<any>(url, datos, httpOptions);
  }
  

  // Método para almacenar el token
  setAuthToken(token: string): void {
    this.authToken = token;
    localStorage.setItem('token', token);
  }

  // Método para obtener el token almacenado
  getAuthToken(): string | null {
    return this.authToken || localStorage.getItem('token') || null;
  }

  //Metodo para obtener los valores del token
  decodeToken(token: string ){
    try {
      this.valoresToken = jwt_decode(token); 
      var valoresTokenJSON = JSON.stringify(this.valoresToken);
      localStorage.setItem('valoresToken', valoresTokenJSON); // Convierte el objeto a una cadena JSON
 
    } catch (error) {
      console.error('Error al decodificar el token:', error);
    }
  }





  // Método para cerrar sesión
  logout(): void {
    this.authToken = null;
    localStorage.removeItem('token');
    this.isAuthenticated = false;
    // Redirigir al usuario a la página de inicio de sesión
    // Puedes usar Router.navigate para esto
  }


  isAuthenticatedTF(): boolean {
    if(this.authToken != null){
      return true;
    }
    return this.isAuthenticated;
  }



  //Metodo para valida DNI

  private apiUrl = 'https://api.apis.net.pe/v1/dni';

  async getDNIValidar(numero: string): Promise<string | null> {
    try {
      const response: any = await this.http.get(`${this.apiUrl}?numero=${numero}`).toPromise();
      const nombre = response.nombre;
      if (nombre && nombre.trim() !== '') {
        return nombre;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error al obtener el nombre:', error);
      return null;
    }
  }
}
