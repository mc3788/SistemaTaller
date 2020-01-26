export class Usuario{ 

    id :number;
	usuario : string;
	idPerfil : number;
	nombre : string;
	password : string;
    estado : string;
    
    constructor(id :number,
	usuario : string,
	idPerfil : number,
	nombre : string,
	password : string,
    estado : string){
        this.id = id;
        this.usuario = usuario;
        this.idPerfil = idPerfil;
        this.nombre = nombre;
        this.password = password;
        this.estado = estado;
    }

}