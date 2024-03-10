import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DashboardGuardService {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.getCurrentUser()) {
      // Se o usuário estiver autenticado, permita o acesso à página de dashboard
      return true;
    } else {
      // Se o usuário não estiver autenticado, redirecione para a página de login
      this.router.navigate(['/login']);
      return false; // Impede o acesso à rota atual
    }
  }
}
