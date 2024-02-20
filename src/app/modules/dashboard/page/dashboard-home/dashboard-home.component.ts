import { DashboardService } from './../../../../service/dashboard/dashboard.service';
import { Component } from '@angular/core';
import { AuthService } from '../../../../service/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { AddProducts } from '../../../interface/dashboard/addProducts.interface';
import { AddProductsService } from '../../../../service/dashboard/add-products.service';
import { Firestore } from '@angular/fire/firestore';
import { Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrl: './dashboard-home.component.scss'
})
export class DashboardHomeComponent {
  price: number = 123.45;
  displayProducts: AddProducts[] = [];
  responsiveOptions: any[] | undefined;
  chartOptions: any;


  constructor(
    private auth: AuthService,
    private cookie: CookieService,
    private router: Router,
    private addProductsService: AddProductsService,
    private dashboardService: DashboardService,
    private firestore: Firestore

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

  quantityOfItems() {
    let totalQuantity = 0;
    for (const product of this.displayProducts) {
      if (!product.quantity || isNaN(Number(product.quantity))) { continue; }
      totalQuantity += Number(product.quantity);
    }
    return totalQuantity
  }

  calculateTotalSales(): number {
    let totalSales = 0;
    this.displayProducts.forEach(product => {
      totalSales += product.price * product.quantity;
    });
    return totalSales;
  }


  getSeverity(inventoryStatus: string) {
    switch (inventoryStatus) {
      case 'EM ESTOQUE':
        return 'success';
      case 'BAIXO ESTOQUE':
        return 'warning';
      case 'FORA DE ESTOQUE':
        return 'danger';
      default:
        throw new Error(`Invalid status: ${inventoryStatus}`);
    }
  }

}
