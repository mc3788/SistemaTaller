import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../environments/environment';

const backenUrl = environment.backenUrl;

@Injectable()
export class DataService {

  constructor(private http: HttpClient) {
  }

  // Editar
  public editEntity(entity: string, token: string, id: number, object: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Auth-Token': token
    });
    return this.http.put(backenUrl + entity + '/' + id, JSON.stringify(object), {headers: headers});
  }

  // Borrar
  public deleteEntity(entity: string, token: string, id: number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Auth-Token': token
    });

    return this.http.delete(backenUrl + entity + '/' + id, {headers: headers});
  }

  // Leer
  public getAllItemsFromEntity(entity: string, token: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Auth-Token': token
    });

    // return this.http.get(backenUrl + entity, {headers: headers});
    return this.http.get(backenUrl + entity);
  }

  // Insertar
  public insertNewEntity(entity: string, token: string, object: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Auth-Token': token
    });

    return this.http.post(backenUrl + entity, JSON.stringify(object), {headers: headers});
  }

  public getEntityDetail(entity: string, token: string, id: number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Auth-Token': token
    });

    return this.http.get(backenUrl + entity + '/' + id, {headers: headers});
  }

}
