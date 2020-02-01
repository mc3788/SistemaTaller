import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent {


  loginForm: FormGroup;
  error = false;

  constructor( private router: Router,
               private authService: AuthService,
               public formBuilder: FormBuilder ) {

    this.loginForm = this.formBuilder.group( {
      email: ['', Validators.required],
      password: ['', Validators.required]
    } );

  }

  async authLoginAction() {
    this.authService.login( this.loginForm.value.usuario, this.loginForm.value.password )
      .subscribe( async resp => {
        this.authService.token = resp['token'];
        this.authService.userId = this.loginForm.value.usuario;
        this.authService.saveSession();
      }, err => {
        this.error = true;
    });
  }

}
