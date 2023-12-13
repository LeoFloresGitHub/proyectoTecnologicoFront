import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { ModalService } from '../service/modal.service';

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
  fechas:any[];

  constructor(private http: HttpClient, private auth: AuthService,private modalService: ModalService) {
    // ... Inicialización existente
    this.fechaActual = this.getFechaActual();
    this.fechas = [
      { value: this.fechaActual, string: this.formatFecha(this.fechaActual) },
      { value: this.sumarDias(this.fechaActual, 1), string: this.formatFecha(this.sumarDias(this.fechaActual, 1)) },
      { value: this.sumarDias(this.fechaActual, 2), string: this.formatFecha(this.sumarDias(this.fechaActual, 2)) }
  ];
    this.piscinas = [
      { id: 1, nombre: "Piscina 1", cantidadMaxima: 7, horaInicio: "10:00:00", horaFin: "17:00:00", compradas: 0,compradasOriginal:0 ,precio: 25.00, seleccionada: false,estado:"Activa" },
      { id: 2, nombre: "Piscina 2", cantidadMaxima: 50, horaInicio: "12:00:00", horaFin: "17:00:00", compradas: 0,compradasOriginal:0, precio: 35.00, seleccionada: false,estado:"Activa" },
    ];

  }

  ngOnInit() {
   this.cantidadPiscinaOcupada();
  }

  async cantidadPiscinaOcupada(){

    // Llamada a la API para idPiscina = 1
    const respuestaPiscina1 = await fetch(`https://proyceapi.fly.dev/api/proyce/reservaspiscina?fecha=${this.fechaActual}&idPiscina=1`);
    const dataPiscina1 = await respuestaPiscina1.json();
    if(dataPiscina1.cantidad == null){this.piscinas[0].compradas = 0}else{this.piscinas[0].compradas = dataPiscina1.cantidad;}
    
  
    // Llamada a la API para idPiscina = 2
    const respuestaPiscina2 = await fetch(`https://proyceapi.fly.dev/api/proyce/reservaspiscina?fecha=${this.fechaActual}&idPiscina=2`);
    const dataPiscina2 = await respuestaPiscina2.json();
    if(dataPiscina2.cantidad == null){this.piscinas[1].compradas = 0}else{    this.piscinas[1].compradas = dataPiscina2.cantidad;
    }
   
    this.http.get<any[]>(`https://proyceapi.fly.dev/api/proyce/piscinas`).subscribe((datosAPI: any[]) => {
   this.piscinas.forEach(piscina => {
    const tarjetaAPI = datosAPI.find(api => api.id === piscina.id);
    if (tarjetaAPI) {
      piscina.estado = tarjetaAPI.estado;
    }
    });
    });
    
  

  }

  actualizarFecha() {
    // Actualiza this.fechaActual con el valor seleccionado del select
    // Llama a la función para actualizar la cantidad de piscinas ocupadas
    this.cantidadPiscinaOcupada();
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
    const numeroAleatorio = Math.floor(Math.random() * 9000) + 1000;

    if (piscinaSeleccionada) {
      // Convierte la cantidad seleccionada a número
      const cantidadSeleccionada = parseInt(this.cantidadSeleccionada.toString());
 
      console.log(piscinaSeleccionada.compradas)
      console.log(cantidadSeleccionada)
      console.log(piscinaSeleccionada.cantidadMaxima)

      // Verifica si la cantidad comprada supera la cantidad máxima permitida
      if (parseInt(piscinaSeleccionada.compradas) + cantidadSeleccionada >parseInt(piscinaSeleccionada.cantidadMaxima)) {
        alert(`No puedes comprar más de ${piscinaSeleccionada.cantidadMaxima - piscinaSeleccionada.compradas} tickets para la piscina ${piscinaSeleccionada.nombre}.`);
      } else {
        // Objeto con los datos a enviar en el cuerpo de la solicitud POST
        const data = {
          nroTicketPiscina: this.fechaActual+this.auth.valoresToken.userId+this.cantidadSeleccionada+numeroAleatorio, // O ajusta según la estructura de tu objeto
          idUsuario: this.auth.valoresToken.userId,
          idPiscina: piscinaSeleccionada.id,
          fechaReserva: this.fechaActual,
          cantidadTickets: cantidadSeleccionada,
          total:cantidadSeleccionada*piscinaSeleccionada.precio
          
        };

        this.modalService.openModal(piscinaSeleccionada.nombre,piscinaSeleccionada.precio*cantidadSeleccionada).subscribe(() => {



        // Realizar la solicitud POST a la API
        this.http.post('https://proyceapi.fly.dev/api/proyce/reservaspiscina', data).subscribe(
          (response) => {
            // Manejar la respuesta de la API, si es necesario

            // Actualizar el estado local de la piscina
            piscinaSeleccionada.compradas += cantidadSeleccionada;

            // Mostrar un mensaje de reserva personalizado
            //alert(`¡Felicidades! Has comprado ${cantidadSeleccionada} tickets de la piscina ${piscinaSeleccionada.nombre} (ID: ${piscinaSeleccionada.id}).`);
            // Ejecutar verificarPiscinasOcupadas después del éxito
            this.cantidadPiscinaOcupada();
          },
          (error) => {
            // Manejar errores en la solicitud
            console.error('Error en la solicitud POST:', error);
          }
        );
        })
      }
    } else {
      alert("Selecciona una piscina antes de comprar.");
    }
  }


  estadoPiscina(estado:string,ID:number){
    const piscina = this.piscinas.find(t => t.id === ID);
  if (piscina) {
      piscina.estado = estado; 
      this.estadoPiscinas(ID,estado);
    }
  }

  estadoPiscinas(ID:number,Estado:string){
    var piscinas = {
      id: ID,
      estado:Estado
    }
    this.http.post('https://proyceapi.fly.dev/api/proyce/updatepiscina', piscinas).subscribe(response => {
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
   
