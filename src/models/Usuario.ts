export class Usuario {
    id:number;
    nombres: string;
    apellidos: string;
    tipoDocumento: number;
    numDocumento: string;
    correoElectronico: string;
    contrasena: string;
    tipoUsuario: number;
    estado: number;
    // Otros campos según tus necesidades
  
    constructor() {
      this.id =0;
      this.nombres = '';
      this.apellidos = '';
      this.tipoDocumento = 1;
      this.numDocumento = '';
      this.correoElectronico = ''
      this.contrasena = '';
      this.tipoUsuario = 1;
      this.estado = 2;
    }

  }