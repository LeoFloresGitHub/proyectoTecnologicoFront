import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pasarela',
  templateUrl: './pasarela.component.html',
  styleUrls: ['./pasarela.component.css']
})
export class PasarelaComponent {
  currentStep: number = 1;
  cardDetails: any = {}; 
  buyerDetails: any = {};
  detalleCompra: any[] = [];
  fechaHoraTransaccion: string = '';
  numeroReserva: string = this.generarNumeroReserva();

  constructor(private router: Router) {
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
      this.buyerDetails = { ...this.cardDetails };
      this.detalleCompra.push({
        producto: '',
        precio: '',
        cantidad: ''
      });
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

  finishPayment() {
    // Lógica para finalizar el pago (puede ser una llamada a una API, etc.)
    console.log('Pago completado');
    this.router.navigate(['/home']);
  }
}
