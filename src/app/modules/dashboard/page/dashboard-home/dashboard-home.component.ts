import { DashboardService } from './../../../../service/dashboard/dashboard.service';
import { Component, ViewChild, inject } from '@angular/core';
import { AuthService } from '../../../../service/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { AddProducts } from '../../../interface/dashboard/addProducts.interface';
import { AddProductsService } from '../../../../service/dashboard/add-products.service';
import { Firestore, updateDoc } from '@angular/fire/firestore';
import { Sidebar } from 'primeng/sidebar';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddProductsComponent } from '../add-products/add-products.component';
import { UpdateProductsService } from '../../../../service/dashboard/update-products.service';
import { UpdateProducts } from '../../../interface/dashboard/updateProducts';
import { ChartData, ChartOptions } from 'chart.js';

interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}
@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrl: './dashboard-home.component.scss'
})
export class DashboardHomeComponent {
  updateForm!: FormGroup;
  displayProducts: AddProducts[] = [];

  responsiveOptions: any[] | undefined;
  price: number = 123.45;
  sidebarVisible: boolean = false;
  visible: boolean = false;
  statuses!: any[];

  first: number = 0;
  rows: number = 10;

  basicData: any;

  @ViewChild('sidebarRef') sidebarRef!: Sidebar;

  public productsChartDatas!: ChartData;
  public GraficoItens!: ChartOptions;



  constructor(
    private auth: AuthService,
    private cookie: CookieService,
    private router: Router,
    private addProductsService: AddProductsService,
    private dashboardService: DashboardService,
    private updateProductsService: UpdateProductsService,
    private _dialog: MatDialog,
    private fb: FormBuilder,
    private firestore: Firestore

  ) {

    this.updateForm = new FormGroup({
      id: new FormControl(''),
      imgProducts: new FormControl(''),
      nome: new FormControl('', Validators.required),
      description: new FormControl(''),
      inventoryStatus: new FormControl(''),
      category: new FormControl(''),
      price: new FormControl(0, Validators.required),
      quantity: new FormControl(0, Validators.required)
    });


  }

  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
  }

  modalShow(uid: string): void {
    this.visible = true;

    this.addProductsService.getAddProducts(uid).subscribe((data: any) => {
      console.log("DADOS DO SERVIÇO ADD PRODUCTS", data);
      this.statuses = data.statuses;
    })
  }


  handleLogout(): void {
    this.cookie.delete('auth-credential');
    void this.router.navigate(['']);
  }

  ngOnInit() {
    this.addProductsService.getAddProducts('').subscribe(addProducts => {
      this.displayProducts = addProducts;
    });
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    this.addProductsService.getAddProducts('').subscribe(addProducts => {
      // Aqui você pode fazer o que precisar com os dados dos produtos
      console.log('Dados dos produtos:', addProducts);

      // Formatando os dados para o gráfico
      const labels = addProducts.map(product => product.nome);
      const data = addProducts.map(product => product.quantity);

      this.basicData = {
        labels: labels,
        datasets: [
          {
            label: ['Nome'],
            data: data,
            backgroundColor: 'rgba(255, 159, 64, 0.2)',
            borderColor: 'rgb(255, 159, 64)',
            borderWidth: 1
          }
        ]
      };
    });
    this.GraficoItens = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },

      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
            font: {
              weight: 500,
            },
          },
          grid: {
            color: surfaceBorder
          }
        },
        y: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder
          },
        },
      },
    };
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



  updateSubmit() {

  }

}
