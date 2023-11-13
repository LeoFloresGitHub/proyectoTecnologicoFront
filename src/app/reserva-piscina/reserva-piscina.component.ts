import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-reserva-piscina',
  templateUrl: './reserva-piscina.component.html',
  styleUrls: ['./reserva-piscina.component.css']
})
export class ReservaPiscinaComponent implements OnInit {

  // ... Propiedades existentes
  fechaActual: string;

   piscinas: any[]; 
  cantidadOptions: number[] = [1, 2, 3, 4, 5];
  cantidadSeleccionada: number = 1;

  constructor(private http: HttpClient, private auth: AuthService) {
    // ... Inicialización existente
    this.fechaActual = this.getFechaActual();

    this.piscinas = [
      { id: 1, nombre: "Piscina 1", cantidadMaxima: 42, horaInicio: "10:00:00", horaFin: "17:00:00", compradas: 0, compradasOriginal: 0, seleccionada: false },
      { id: 2, nombre: "Piscina 2", cantidadMaxima: 50, horaInicio: "12:00:00", horaFin: "17:00:00", compradas: 0, compradasOriginal: 0, seleccionada: false },
    ];
  }
  getFechaActual() {
    const fechaActual = new Date();
    const year = fechaActual.getFullYear();
    const month = (fechaActual.getMonth() + 1).toString().padStart(2, '0'); // Agregamos 1 porque los meses comienzan desde 0
    const day = fechaActual.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  ngOnInit() {
    // ... Método existente
    //this.verificarPiscinasOcupadas();
  }

  verificarPiscinasOcupadas() {
    this.http.get<any[]>(`http://localhost:3000/api/proyce/reservaspiscinas?fecha=${this.fechaActual}`).subscribe((datosAPI: any[]) => {
      this.piscinas.forEach(piscina => {
        const data = datosAPI.find(data => data.idPiscina === piscina.id);
        if (data) {
          piscina.compradas = data.cantidadCompradas; // Obtener la cantidad de compradas desde la API
        }
      });
    });
  }

  seleccionarPiscina(piscina: any) {
    if (piscina.compradasOriginal <= this.cantidadSeleccionada) {
      // Alternar el estado de la piscina actual
      piscina.seleccionada = !piscina.seleccionada;
  
      // Restablecer el estado de las demás piscinas
      this.piscinas.forEach(p => {
        if (p.id !== piscina.id) {
          p.seleccionada = false;
        }
      });
    } else {
      alert(`Solo puedes seleccionar hasta ${this.cantidadSeleccionada} tickets por reserva.`);
    }
  }
  
  comprarPiscinas() {
    const piscinaSeleccionada = this.piscinas.find(p => p.seleccionada);
  
    if (piscinaSeleccionada) {
      // Lógica para enviar la reserva al servidor
      // ... Código existente
  
      // Convierte la cantidad seleccionada a número
      const cantidadSeleccionada = parseInt(this.cantidadSeleccionada.toString());
  
      // Verifica si la cantidad comprada supera la cantidad máxima permitida
      if (piscinaSeleccionada.compradas + cantidadSeleccionada > piscinaSeleccionada.cantidadMaxima) {
        alert(`No puedes comprar más de ${piscinaSeleccionada.cantidadMaxima - piscinaSeleccionada.compradas} tickets para la piscina ${piscinaSeleccionada.nombre}.`);
      } else {
        // Actualiza el estado de las piscinas seleccionadas
        piscinaSeleccionada.compradas += cantidadSeleccionada;
  
        // Muestra un mensaje de reserva personalizado
        alert(`¡Felicidades! Has comprado ${cantidadSeleccionada} tickets de la piscina ${piscinaSeleccionada.nombre} (ID: ${piscinaSeleccionada.id}).`);
      }
    } else {
      alert("Selecciona una piscina antes de comprar.");
    }
  }

   
}