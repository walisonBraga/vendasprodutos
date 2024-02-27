import { Injectable } from '@angular/core';
import { Router, UrlTree, CanActivate } from '@angular/router'; // Importe CanActivate
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate { // Implemente CanActivate

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.authService.isLoggedIn()) {
      return this.router.navigate(['/dashboard']); // Retorne a navegação como uma promessa
    }
    return true;
  }


}
