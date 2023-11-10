import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-misreservas',
  templateUrl: './misreservas.component.html',
  styleUrls: ['./misreservas.component.css']
})
export class MisreservasComponent implements OnInit {
  objLista: any[] = []; // Aquí almacenaremos los datos de la solicitud GET

  constructor(private http: HttpClient, private auth:AuthService,private router: Router) { }

  ngOnInit(): void {
    // Realiza la solicitud GET a tu API y llena objLista con los datos
    this.http.get<any[]>(`http://localhost:3000/api/proyce/reservacanchaxid?id=${this.auth.valoresToken.userId}}`).subscribe(data => {
      this.objLista = data;
    });
  }

  volver(){
    
    this.router.navigate(['/']);
  }
  
}
