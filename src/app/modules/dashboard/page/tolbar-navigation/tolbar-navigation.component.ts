import { Component, OnInit, ViewChild } from '@angular/core';
import { Sidebar } from 'primeng/sidebar';
import { RegisterService } from '../../../../service/register.service';
import { AuthService } from '../../../../service/auth.service';
import { Register } from '../../../interface/register.interface';
import { NotificationService } from '../../../../service/Notification/Notification.service';

@Component({
  selector: 'app-tolbar-navigation',
  templateUrl: './tolbar-navigation.component.html',
  styleUrl: './tolbar-navigation.component.scss'
})
export class TolbarNavigationComponent  implements OnInit {
  value!: 7;
  @ViewChild('sidebarRef') sidebarRef!: Sidebar;
  sidebarVisible: boolean = false;
  quantidadeNotificacoes: number = 0;



  isDarkTheme = false;

  toggleDarkTheme() {
    this.isDarkTheme = !this.isDarkTheme;
  }

  constructor(
    private register: RegisterService,
     private auth: AuthService,
    private notificationService: NotificationService) { }

  closeCallback(e: Event): void {
    this.sidebarRef.close(e);
  }

  signOut() {
    this.auth.logout();
  }

  ngOnInit() {
    this.notificationService.quantidadeNotificacoes$.subscribe(quantidade => {
      this.quantidadeNotificacoes = quantidade;
    });

  }

  get user(): Register | null {
    return this.auth.getCurrentUser();
  }



   onSubmit() {}

}
