import { Component,Inject  } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from '../service/modal.service';
import { MAT_DIALOG_DATA,MatDialogRef  } from '@angular/material/dialog';


@Component({
  selector: 'app-pasarela',
  templateUrl: './pasarela.component.html',
  styleUrls: ['./pasarela.component.css']
})
export class PasarelaComponent {

// Expresión regular para permitir solo números
  currentStep: number = 1;
  cardDetails: any = {}; 
  buyerDetails: any = {};
  detalleCompra: any[] = [];
  fechaHoraTransaccion: string = '';
  numeroReserva: string = this.generarNumeroReserva();

  constructor(private router: Router,private modalService: ModalService, 
    @Inject(MAT_DIALOG_DATA) public data: { producto: string, precio: number },
  public dialogRef: MatDialogRef<PasarelaComponent, any>) {

  this.detalleCompra = [
    { precio: this.data.precio , producto:this.data.producto}
  ];
   
    this.fechaHoraTransaccion = this.obtenerFechaHoraActual();
    
  }

  formatCardNumber() {
    
    this.cardDetails.cardNumber = this.cardDetails.cardNumber.replace(/(\d{4})(?=\d)/g, '$1 ');
  }

  formatExpiryDate() {
    this.cardDetails.expiryDate = this.cardDetails.expiryDate.substring(0, 4);
    this.cardDetails.expiryDate = this.cardDetails.expiryDate.replace(/(\d{2})(?=\d)/g, '$1/');
  }

  obtenerFechaHoraActual(): string {
    const fechaHora = new Date();
    return fechaHora.toLocaleString();  
  }

  generarNumeroReserva(): string {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const longitudCodigo = 10;
    let codigo = '';

    for (let i = 0; i < longitudCodigo; i++) {
      const indiceCaracter = Math.floor(Math.random() * caracteres.length);
      codigo += caracteres.charAt(indiceCaracter);
    }

    return codigo;
  }

  nextStep() {
    if (this.currentStep === 1) {
      
      console.log(this.cardDetails.firstName)
      if(this.cardDetails.firstName == undefined || this.cardDetails.lastName == undefined ||
        this.cardDetails.cardNumber == undefined || this.cardDetails.expiryDate == undefined  || this.cardDetails.cvv == undefined
        || this.cardDetails.firstName == "" || this.cardDetails.lastName == "" ||
        this.cardDetails.cardNumber == "" || this.cardDetails.expiryDate ==  "" || this.cardDetails.cvv == "" ){
        alert("No puede continuar si no rellena todo los campos")
        return
      }
      this.buyerDetails = { ...this.cardDetails };
      
    } else if (this.currentStep === 3) {
      // Lógica para finalizar el pago (puede ser una llamada a una API, etc.)
      console.log('Detalles del pago:', this.cardDetails);
      // Agrega aquí la lógica para procesar el pago
  
      // Redirige al usuario al "home"
      this.router.navigate(['/home']);
    }
    this.currentStep++;
  }

  prevStep() {
    this.currentStep--;
  }


  finishPayment(): void {

    // Cerrar el modal desde el propio componente modal
    this.modalService.closeDialog();
  }
}
