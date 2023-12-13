import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { ModalService } from '../service/modal.service';
import { MatDialog,MatDialogRef  } from '@angular/material/dialog';

import { PasarelaComponent } from '../pasarela/pasarela.component';


@Component({
  selector: 'app-reserva-salon',
  templateUrl: './reserva-salon.component.html',
  styleUrls: ['./reserva-salon.component.css']
})
export class ReservaSalonComponent implements OnInit {
  dialogRef: MatDialogRef<PasarelaComponent, any> | undefined;  // Inicializa dialogRef

  fechaActualReal: string;
  fechaActual: string;
  salones: any[];
  fechas: any[];

  constructor(private http: HttpClient, private auth: AuthService,private modalService: ModalService) {
    this.fechaActual = this.getFechaActual();
    this.fechaActualReal = this.getFechaActual();
    this.fechas = [
      { value: this.fechaActual, string: this.formatFecha(this.fechaActual) },
      { value: this.sumarDias(this.fechaActual, 5), string: this.formatFecha(this.sumarDias(this.fechaActual, 5)) },
      { value: this.sumarDias(this.fechaActual, 10), string: this.formatFecha(this.sumarDias(this.fechaActual, 10)) }
    ];

    this.salones = [
      { idSalon: 3, nombre: "Salón Eventos Pequeños",fecha:this.fechaActual, horaInicio: "12:00:00 p.m.", horaFin: "3:00:00 a.m.", precio: 550.00, seleccionada: false, reservaCoincide: false, estado: 'Disponible',estadoSalon:'Activa'},
      { idSalon: 4, nombre: "Salón Eventos Grandes", fecha:this.fechaActual, horaInicio: "12:00:00 p.m.", horaFin: "5:00:00 a.m.", precio: 1050.00, seleccionada: false, reservaCoincide: false, estado: 'Disponible',estadoSalon:'Activa' },
    ];
  }

  ngOnInit() {
    this.verificarReservasOcupadas();
  }

  actualizarFecha() {
    
    this.verificarReservasOcupadas();
  }

 

verificarReservasOcupadas(){

      this.salones[0].estado ='Disponible';
      this.salones[1].estado ='Disponible';

      this.salones[0].fecha =this.fechaActual;
      this.salones[1].fecha =this.fechaActual;


      // Realizar la solicitud GET a la API con la fecha actual
       this.http.get<any[]>(`https://proyceapi.fly.dev/api/proyce/reservassalon?fecha=${this.fechaActual}`).subscribe((datosAPI: any[]) => {

       datosAPI.forEach((dato) => {

           const tarjeta = this.salones.find(t => t.fecha === dato.fecha && t.idSalon === dato.idSalon);
           if (tarjeta) {
             tarjeta.estado = "ocupada";
           }
         });
       });

       this.http.get<any[]>(`https://proyceapi.fly.dev/api/proyce/salones`).subscribe((datosAPI: any[]) => {
   this.salones.forEach(tarjeta => {
    const tarjetaAPI = datosAPI.find(apiSalon => apiSalon.id === tarjeta.idSalon);
    if (tarjetaAPI) {
      tarjeta.estadoSalon = tarjetaAPI.estado;
    }
    });
    });
}
   
  

seleccionarSalon(salon: any) {
  // Verifica si el estado de la tarjeta es "ocupada"
  if (salon.estado === 'ocupada') {
    // Si está ocupada, no permitir la selección y salir de la función
    return;
  }

  // Alternar el estado de selección del salón
  salon.seleccionada = !salon.seleccionada;

  // Restablecer el estado de los demás salones
  this.salones.forEach(s => {

    if (s.idSalon !== salon.idSalon) {
      s.seleccionada = false;
    }
  });
}

reservarSalon() {

    const salonSeleccionado = this.salones.find(s => s.seleccionada);

    if (salonSeleccionado) {

      const reserva = {
        
          nroReservaSalon: this.fechaActual+'-'+salonSeleccionado.idSalon,
          fechaReserva: this.fechaActualReal,
          fechaEvento: this.fechaActual,
          idUsuario: this.auth.valoresToken.userId, 
          idSalon: salonSeleccionado.idSalon,
          total: salonSeleccionado.precio
    
      };
      this.modalService.openModal(salonSeleccionado.nombre,salonSeleccionado.precio).subscribe(() => {

      // Realizar la solicitud POST a la API de reserva
      this.http.post('https://proyceapi.fly.dev/api/proyce/reservarsalon', reserva).subscribe(response => {
        // Manejar la respuesta si es necesario
      });
      salonSeleccionado.seleccionada = false;

      salonSeleccionado.estado = "ocupada";
      //alert("Has reservado el " + salonSeleccionado.nombre); 
      
    });
    

    } else {
      alert("Selecciona un salón antes de reservar.");
    }
  }

  getFechaActual() {
    const fechaActual = new Date();
    const year = fechaActual.getFullYear();
    const month = (fechaActual.getMonth() + 1).toString().padStart(2, '0'); // Agregamos 1 porque los meses comienzan desde 0
    const day = fechaActual.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  

  sumarDias(fechaString: string, dias: number): string {
    const fecha = new Date();
    fecha.setDate(fecha.getDate() + dias);

    const year = fecha.getFullYear();
    const month = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const day = fecha.getDate().toString().padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  }

  formatFecha(fecha: string): string {
    const [year, month, day] = fecha.split('-');
    return `${day}/${month}/${year}`;
  }




  
  abrirModal(uno: string,dos: number): void {
    this.modalService.openModal(uno,dos);
  }

  cerrarModal(): void {
    this.modalService.closeDialog();
  }

  estadoSalon(estado:string,ID:number){
    const salon = this.salones.find(t => t.idSalon === ID);
  if (salon) {
      salon.estadoCancha = estado; 
      this.estadoSalones(ID,estado);
    }
  }

  estadoSalones(ID:number,Estado:string){
    var salones = {
      id: ID,
      estado:Estado
    }
    this.http.post('https://proyceapi.fly.dev/api/proyce/updatesalon', salones).subscribe(response => {
        // Manejar la respuesta si es necesario
        console.log(response);
      });
  }
  

  tienePermiso(permiso: number): boolean {
    if(this.auth.valoresToken != null){
      const permisos = this.auth.valoresToken.permisos;
    for (let i = 0; i < permisos.length; i++) {
        if (permisos[i].idFuncionalidad === permiso) {
            return true;
        }
    }
    }
    return false;
  }
  

}



