export class Acceso {
  id: number;
  idPerfil: number;
  opcion: string;
  alta:   string;
  baja:   string;
  cambio: string;
  consulta: string;

  constructor( 
               id: number,
               idPerfil: number,
               opcion: string,
               alta:   string,
               baja:   string,
               cambio: string,
               consulta: string
  ) {
    this.id = id;
    this.idPerfil = idPerfil;
    this.opcion = opcion;
    this.alta = alta;
    this.baja = baja;
    this.cambio = cambio;
    this.consulta = consulta;
  }

}
