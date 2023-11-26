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
  objListaReservasCancha: any[] = []; // Aquí almacenaremos los datos de la solicitud GET para reservas canchas
  objListaReservasPiscina: any[] = []; // Aquí almacenaremos los datos de la solicitud GET para reservas piscinas
  objListaReservasSalon: any[] = []; // Aquí almacenaremos los datos de la solicitud GET para reservas salones


  constructor(private http: HttpClient, private auth:AuthService,private router: Router) { }

  ngOnInit(): void {
    // Realiza la solicitud GET a tu API y llena objLista con los datos
    this.llamadaApis();
  }

  llamadaApis(){
    this.http.get<any[]>(`http://localhost:3000/api/proyce/reservacanchaxid?id=${this.auth.valoresToken.userId}}`).subscribe(data => {
      this.objListaReservasCancha = data;
    });

    this.http.get<any[]>(`http://localhost:3000/api/proyce/reservaspiscinaxid?id=${this.auth.valoresToken.userId}}`).subscribe(data => {
      this.objListaReservasPiscina = data;
    });

    this.http.get<any[]>(`http://localhost:3000/api/proyce/reservasalonxid?id=${this.auth.valoresToken.userId}}`).subscribe(data => {
      this.objListaReservasSalon = data;
      console.log(data)
    });
  }
  volver(){
    
    this.router.navigate(['/']);
  }
  
}
