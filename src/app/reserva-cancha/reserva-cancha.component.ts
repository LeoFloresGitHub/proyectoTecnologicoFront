import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';


@Component({
  selector: 'app-reserva-cancha',
  templateUrl: './reserva-cancha.component.html',
  styleUrls: ['./reserva-cancha.component.css']
})
export class ReservaCanchaComponent implements OnInit {
  tarjetas: any[];
  fechaActual: string;
  

  constructor(private http: HttpClient, private auth: AuthService) {
   
    this.fechaActual = this.getFechaActual();
    this.tarjetas = [
      { fecha: this.fechaActual, horaInicio: "10:00:00", estado: "libre", label: "Cancha 10-11 AM", idCancha: 2, tipo: "6-6",precio: 80 },
      { fecha: this.fechaActual, horaInicio: "11:00:00", estado: "libre", label: "Cancha 11-12 AM", idCancha: 1, tipo: "7-7",precio: 100 },
      { fecha: this.fechaActual, horaInicio: "12:00:00", estado: "libre", label: "Cancha 12-1 PM", idCancha: 2, tipo: "6-6",precio: 80 },
      { fecha: this.fechaActual, horaInicio: "13:00:00", estado: "libre", label: "Cancha 1-2 PM", idCancha: 1, tipo: "7-7",precio: 100 },
      { fecha: this.fechaActual, horaInicio: "14:00:00", estado: "libre", label: "Cancha 2-3 PM", idCancha: 2, tipo: "6-6",precio: 80 },
      { fecha: this.fechaActual, horaInicio: "15:00:00", estado: "libre", label: "Cancha 3-4 PM", idCancha: 1, tipo: "7-7",precio: 100 },
      { fecha: this.fechaActual, horaInicio: "16:00:00", estado: "libre", label: "Cancha 4-5 PM", idCancha: 2, tipo: "6-6",precio: 80 },
      { fecha: this.fechaActual, horaInicio: "17:00:00", estado: "libre", label: "Cancha 5-6 PM", idCancha: 1, tipo: "7-7",precio: 100 },
      { fecha: this.fechaActual, horaInicio: "18:00:00", estado: "libre", label: "Cancha 6-7 PM", idCancha: 2, tipo: "6-6",precio: 80 },
      { fecha: this.fechaActual, horaInicio: "19:00:00", estado: "libre", label: "Cancha 7-8 PM", idCancha: 1, tipo: "7-7",precio: 100 }
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
    this.verificarCanchasOcupadas();
  }

  verificarCanchasOcupadas() {

   
   // Realizar la solicitud GET a la API con la fecha actual
    this.http.get<any[]>(`http://localhost:3000/api/proyce/reservascanchas?fecha=${this.fechaActual}`).subscribe((datosAPI: any[]) => {
      datosAPI.forEach((dato) => {
        const tarjeta = this.tarjetas.find(t => t.fecha === dato.fecha && t.horaInicio === dato.horaInicio);
        if (tarjeta) {
          tarjeta.estado = "ocupada";
        }
      });
    });
  }




  seleccionarCancha(tarjeta: any) {
    if (tarjeta.estado !== "ocupada") {
      tarjeta.estado = tarjeta.estado === "seleccionada" ? "libre" : "seleccionada";
    }
    
  }

  reservarCancha() {
    const tarjetasSeleccionadas = this.tarjetas.filter(t => t.estado === "seleccionada");
    
    // Generar el objeto de reserva y realizar una solicitud POST
    tarjetasSeleccionadas.forEach(tarjeta => {
      const reserva = {
        nroReservaCancha: `${tarjeta.fecha}${tarjeta.horaInicio.substr(0, 2)}`,
        idUsuario: this.auth.valoresToken.userId, // Ajusta el ID de usuario según tus necesidades
        idCancha: tarjeta.idCancha, // Ajusta el ID de cancha según tus necesidades
        horaInicio: `${tarjeta.horaInicio}`,
        horaFin: `${parseInt(tarjeta.horaInicio) + 1}:00:00`, // Calcula la hora de fin según tus necesidades
        fecha: tarjeta.fecha
      };

      console.log(reserva);
      // Realizar la solicitud POST a la API de reserva
      this.http.post('http://localhost:3000/api/proyce/reservarcancha', reserva).subscribe(response => {
        // Manejar la respuesta si es necesario
        console.log(response);
      });
    });

    // Actualiza el estado de las tarjetas seleccionadas
    tarjetasSeleccionadas.forEach(tarjeta => {
      tarjeta.estado = "ocupada";
    });

    // Muestra un mensaje de reserva
    const canchasReservadas = tarjetasSeleccionadas.map(t => t.label);
    alert("Has reservado las siguientes canchas:\n" + canchasReservadas.join("\n"));
  }
}
