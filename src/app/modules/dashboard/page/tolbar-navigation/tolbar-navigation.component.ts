import { Component, OnInit, ViewChild } from '@angular/core';
import { Sidebar } from 'primeng/sidebar';
import { RegisterService } from '../../../../service/register.service';
import { AuthService } from '../../../../service/auth.service';
import { Register } from '../../../interface/register.interface';
import { NotificationService } from '../../../../service/Notification/Notification.service';
import { ThemeService } from '../../../../service/dashboard/theme.service';

@Component({
  selector: 'app-tolbar-navigation',
  templateUrl: './tolbar-navigation.component.html',
  styleUrl: './tolbar-navigation.component.scss'
})
export class TolbarNavigationComponent implements OnInit {
  value!: 7;
  @ViewChild('sidebarRef') sidebarRef!: Sidebar;
  sidebarVisible: boolean = false;
  quantidadeNotificacoes: number = 0;

  isDarkTheme: boolean = false;

  constructor(
    private register: RegisterService,
    private auth: AuthService,
    private notificationService: NotificationService,
    private themeService: ThemeService
    ) { }

    oCnhange(newValue: boolean): void{
      console.log(newValue);
    }

    toggleTheme(): void {
      this.isDarkTheme = !this.isDarkTheme; // Alternar entre true e false
      // Aplicar o tema ativo ao serviço de tema
      this.themeService.setActiveTheme(this.isDarkTheme ? 'dark' : 'light');
    }

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

  onSubmit() { }

}
