import { Component, ViewChild } from '@angular/core';
import { Sidebar } from 'primeng/sidebar';
import { RegisterService } from '../../../../service/register.service';
import { AuthService } from '../../../../service/auth.service';
import { Register } from '../../../interface/register.interface';

@Component({
  selector: 'app-tolbar-navigation',
  templateUrl: './tolbar-navigation.component.html',
  styleUrl: './tolbar-navigation.component.scss'
})
export class TolbarNavigationComponent {
  @ViewChild('sidebarRef') sidebarRef!: Sidebar;
  sidebarVisible: boolean = false;

  constructor(private register: RegisterService, private auth: AuthService) { }

  closeCallback(e: Event): void {
    this.sidebarRef.close(e);
  }

  signOut() {
    this.auth.signOut().then((res) => {
      window.location.reload()
      return res;
    });
  }

  get user(): Register | null {
    return this.auth.getCurrentUser();
  }


  async onSubmit() {
    // const register: Register = {
    //   nome: this.auth.getCurrentUser().nome,
    //   sobrenome: this.auth.getCurrentUser().email,
    //   email: this.auth.getCurrentUser().email,
    //   password: this.auth.getCurrentUser().password,
    // }
    // return register;
  }
}
