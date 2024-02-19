import { Component } from '@angular/core';
import { AuthService } from '../../../../service/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { AddProducts } from '../../../interface/dashboard/addProducts.interface';
import { AddProductsService } from '../../../../service/dashboard/add-products.service';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrl: './dashboard-home.component.scss'
})
export class DashboardHomeComponent {
  price: number = 123.45;
  displayProducts: AddProducts[] = [];
  responsiveOptions: any[] | undefined;
  totalRevenue  = 0;


  constructor(
    private auth: AuthService,
    private cookie: CookieService,
    private router: Router,
    private addProductsService: AddProductsService,

  ) {

  }

  handleLogout(): void {
    this.cookie.delete('auth-credential');
    void this.router.navigate(['']);
  }

  ngOnInit() {
    this.addProductsService.getAddProducts('').subscribe(addProducts => {
      this.displayProducts = addProducts;
    });
  }
}
