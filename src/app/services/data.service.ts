import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../environments/environment';

const backenUrlImg = environment.backenUrlImg;

@Injectable()
export class DataService {

	constructor(private http: HttpClient) {
	}
	
	// Editar
	public editEntity(entity: string, token: string, id: number, object: any) {
	    const headers = new HttpHeaders({
	      'X-Auth-Token': token
	    });

	    return this.http.put(backenUrlImg + entity + '/' + id, JSON.stringify(object), {headers: headers});
	 }

	// Borrar
	public deleteEntity(entity: string, token: string, id: number) {
	    const headers = new HttpHeaders({
	      'X-Auth-Token': token
	    });

	    return this.http.delete(backenUrlImg + entity + '/' + id, {headers: headers});
	  }

	// Leer
	public getAllItemsFromEntity(entity: string, token: string) {
	    const headers = new HttpHeaders({
	      'X-Auth-Token': token
		});
		
		console.log(`Url: ${backenUrlImg}${entity}`);

		// return this.http.get(backenUrlImg + entity, {headers: headers});
		return this.http.get(backenUrlImg + entity);
	  }

	// Insertar
	public insertNewEntity(entity: string, token: string, object: any) {
	    const headers = new HttpHeaders({
	      'X-Auth-Token': token
	    });
	    return this.http.post(backenUrlImg + entity, JSON.stringify(object), {headers: headers});
	  }

}