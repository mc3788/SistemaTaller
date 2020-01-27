import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Usuario} from '../interface/bo/Usuario';
import {environment} from '../../environments/environment';

const backendUrl = environment.backendAuth;

@Injectable()
export class AuthService {

  token: string;
  userId: string;
  AuthSecurity: boolean;
  user: Usuario;
  logged = false;

  constructor(public http: HttpClient) {
  }

  // Logeo de usuario por post
  login(username: string, password: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post( backendUrl, {usuario: username, password: password}, {headers: headers});
  }

  saveSession() {
    return new Promise((resolve, reject) => {
      if (this.token) {
        localStorage.setItem('token', this.token);
        localStorage.setItem('user', this.userId);
        this.logged = true;
      } else {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.logged = false;
      }
    });
  }

  logout() {
    this.token = null;
    this.userId = null;
    this.AuthSecurity = false;
    this.logged = false;
    this.saveSession();

  }

  async loadSession() {
    return new Promise((resolve, reject) => {
      this.token = localStorage.getItem('token');
      this.userId = localStorage.getItem( 'user');
    });
  }

}
