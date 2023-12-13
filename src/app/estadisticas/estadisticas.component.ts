import { Component,OnInit } from '@angular/core';
import {Chart} from 'chart.js';


@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent {
  data: { mes: string, cantidad: number }[] = [
    { mes: 'Enero', cantidad: 100 },
    ];
  data2: { mes: string, cantidad: number }[] = [
    { mes: 'Enero', cantidad: 100 },
    ];
  data3: { mes: string, cantidad: number }[] = [
    { mes:'Enero', cantidad: 100 },
    ];
  areas = [
    { color: 'verde', nombre: 'Cancha Deportiva', cantidad: 1500 },
    { color: 'celeste', nombre: 'Piscina', cantidad: 2000 },
    { color: 'gris', nombre: 'Salones', cantidad: 1550 }
  ];
  dataCancha = [{
    servicio: 'Cancha',
    fecha: new Date("2023-11-03"),
    nombreCancha: "Cancha 7-7",
    usuario: "Leonardo Flores",
    total: 100
  }];
  dataPiscina = [
    {
      servicio: 'Piscina',
      fechaReserva: new Date("2023-11-14"),
      nombrePiscina: "Piscina1",
      usuario: "Leonardo Flores",
      total: 25
    }
  ];
  dataSalon = [{
    servicio: 'Salón',
    fechaReserva: new Date("2023-11-15"),
    nombreSalon: "Salón Teatro",
    usuario: "Leonardo Flores",
    total: 300
  }];

  fechaComienzo!: string; // Variable para el primer input de fecha
  fechaFinal!: string; // Variable para el segundo input de fecha
  
  
  constructor() {
    this.inicializarFechas();


  }
  ngOnInit (){
    this.obtenerTotales(); 
  }

  private inicializarFechas() {
    // Inicializar fechaFinal con la fecha de hoy
    const hoy = new Date();
    this.fechaFinal = this.formatoFecha(hoy);

    // Inicializar fechaComienzo con un mes antes
    const unMesAtras = new Date();
    unMesAtras.setMonth(unMesAtras.getMonth() - 1);
    this.fechaComienzo = this.formatoFecha(unMesAtras);
  }

  formatoFecha(fecha: Date): string {
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const anio = fecha.getFullYear();
    return `${anio}-${mes}-${dia}`;
  }
  generarGrafico(canvasId: string, data: any[]) {
    const canvas: any = document.getElementById(canvasId);
    const ctx = canvas.getContext('2d');
    Chart.getChart(ctx)?.destroy();

    const meses = data.map(item => item.mes);
    const cantidades = data.map(item => item.cantidad);
  
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: meses,
        datasets: [{
          label: 'Ventas',
          data: cantidades,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }


  async obtenerTotales(){
    const response = await fetch(`https://proyceapi.fly.dev/api/proyce/estadisticastotales?fechaInicial=${this.fechaComienzo}&fechaFinal=${this.fechaFinal}`);
    const data = await response.json();
    this.areas = data.areas;
    
    const response2 = await fetch(`https://proyceapi.fly.dev/api/proyce/estadisticastotalesxmes?fechaInicial=${this.fechaComienzo}&fechaFinal=${this.fechaFinal}&tabla=reservacancha&fecha=fecha`);
    const data2 = await response2.json();
    this.data = data2.data;

    const response3 = await fetch(`https://proyceapi.fly.dev/api/proyce/estadisticastotalesxmes?fechaInicial=${this.fechaComienzo}&fechaFinal=${this.fechaFinal}&tabla=reservapiscina&fecha=fechaReserva`);
    const data3 = await response3.json();
    this.data2 = data3.data;

    const response4 = await fetch(`https://proyceapi.fly.dev/api/proyce/estadisticastotalesxmes?fechaInicial=${this.fechaComienzo}&fechaFinal=${this.fechaFinal}&tabla=reservasaloneventos&fecha=fechaEvento`);
    const data4= await response4.json();
    this.data3 = data4.data;

    const response5 = await fetch(`https://proyceapi.fly.dev/api/proyce/estadisticastabla?fechaInicial=${this.fechaComienzo}&fechaFinal=${this.fechaFinal}`);
    const data5= await response5.json();
    this.dataCancha = data5.dataCancha;
    this.dataPiscina = data5.dataPiscina;
    this.dataSalon = data5.dataSalon;

    this.generarGrafico('myChart', this.data);     // data1 es tu primer conjunto de datos
    this.generarGrafico('myChart2', this.data2);    // data2 es tu segundo conjunto de datos
    this.generarGrafico('myChart3', this.data3);    // data3 es tu tercer conjunto de datos

  }


  calcularTotalGeneral(): number {
    const convertirAEntero = (valor: string | number): number => {
      const entero = typeof valor === 'string' ? parseInt(valor, 10) : valor;
      return isNaN(entero) ? 0 : entero;
    };
  
    let totalGeneral = 0;
  
    // Sumar los totales de Cancha
    totalGeneral += this.dataCancha.reduce((total, item) => total + convertirAEntero(item.total), 0);
  
    // Sumar los totales de Piscina
    totalGeneral += this.dataPiscina.reduce((total, item) => total + convertirAEntero(item.total), 0);
  
    // Sumar los totales de Salón
    totalGeneral += this.dataSalon.reduce((total, item) => total + convertirAEntero(item.total), 0);
  
    return totalGeneral;
  }
}
