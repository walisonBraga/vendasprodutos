import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { Message, MessageService } from 'primeng/api';
import { user } from '@angular/fire/auth';
import Swal from 'sweetalert2';
import { Register } from '../interface/register.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [MessageService],
})
export class LoginComponent {
  loginForm!: FormGroup;
  value!: string;
  visible: boolean = false;
  messages: Message[] | undefined;
  nome: string | undefined;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,

  ) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required, [this.checkEmail]],
      password: ['', Validators.required]
    });
  }

  checkEmail(control: any): { invalidEmail?: boolean } | null {
    const isValid = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(control.value);
    return !isValid ? { invalidEmail: true } : null;
  }


  get user(): Register | null {
    return this.authService.getCurrentUser();
  }

  async onSubmit() {
    this.authService.login(this.loginForm.controls['email'].value, this.loginForm.controls['password'].value)
      .then(_resposta => {
        console.log(_resposta);
        this.authService.getUserInfo(_resposta.user.uid);
        this.loginForm.reset();
        this.router.navigate(['/dashboard']);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: `Seja Bem-vindo de volta`,
          text: `
          ${this.user?.nome}
          ${this.user?.sobrenome}!`,
          showConfirmButton: false,
          timer: 3000
        });

      }, error => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: `Erro ao Logar ! Tente novamente mais tarde... `,
          showConfirmButton: false,
          timer: 3000
        });
        console.log(error);
      })
  }

  public get f(): any {
    return this.loginForm.controls;
  }

}

