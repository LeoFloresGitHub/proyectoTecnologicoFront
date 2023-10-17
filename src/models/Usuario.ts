export class Usuario {
    id:number;
    nombres: string;
    apellidos: string;
    tipoDocumento: number;
    numDocumento: string;
    correoElectronico: string;
    contrasena: string;
    tipoUsuario: string;
    estado: number;
    idUsuarioAccion!: number;
    
  
    constructor() {
      this.id =0;
      this.nombres = '';
      this.apellidos = '';
      this.tipoDocumento = 1;
      this.numDocumento = '';
      this.correoElectronico = ''
      this.contrasena = '';
      this.tipoUsuario = "Usuario";
      this.estado = 2;
      this.idUsuarioAccion;
    }

  }