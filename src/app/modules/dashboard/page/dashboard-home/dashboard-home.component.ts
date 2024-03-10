import { Component, ViewChild, inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { AddProducts } from '../../../interface/dashboard/addProducts.interface';
import { AddProductsService } from '../../../../service/dashboard/add-products.service';
import { Sidebar } from 'primeng/sidebar';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ChartData, ChartOptions } from 'chart.js';
import { ThemeService } from '../../../../service/dashboard/theme.service';


@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrl: './dashboard-home.component.scss'
})
export class DashboardHomeComponent {
  updateForm!: FormGroup;
  displayProducts: AddProducts[] = [];

  isDarkTheme: boolean = false;

  value: number = 60;

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
    private cookie: CookieService,
    private router: Router,
    private addProductsService: AddProductsService,
    private themeService: ThemeService

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


  toggleTheme(): void {
    this.isDarkTheme = !this.isDarkTheme; // Alternar entre true e false
    // Aplicar o tema ativo ao serviço de tema
    this.themeService.setActiveTheme(this.isDarkTheme ? 'dark' : 'light');
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
    this.isDarkTheme = this.themeService.getActiveTheme() === 'dark';

    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    this.addProductsService.getAddProducts('').subscribe(addProducts => {
      this.displayProducts = addProducts;

      // Filtrar apenas os produtos do ano atual
      const currentYear = new Date().getFullYear();
      const productsThisYear = addProducts.filter(product => new Date(product.dataCadastro).getFullYear() === currentYear);

      // Criar um objeto para armazenar as quantidades de itens por mês
      const quantitiesByMonth: { [key: string]: number } = {
        Jan: 0, Fev: 0, Mar: 0, Abr: 0, Mai: 0, Jun: 0, Jul: 0, Ago: 0, Set: 0, Out: 0, Nov: 0, Dez: 0
      };

      // Preencher o objeto com as quantidades de itens
      productsThisYear.forEach(product => {
        const month = new Date(product.dataCadastro).getMonth();
        const monthName = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'][month];
        quantitiesByMonth[monthName]++;
      });

      // Extrair as quantidades para criar o gráfico
      const quantities = Object.values(quantitiesByMonth);

      // Configurar os dados do gráfico
      this.basicData = {
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        datasets: [
          {
            label: 'Quantidade de Itens Cadastrados',
            data: quantities,
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

  calculateTotalResale(): number {
    let totalResale = 0;
    this.displayProducts.forEach(product => {
      totalResale += product.quantity * product.resale;
    });
    return totalResale;
  }
  profits(): number {
    const totalSales = this.calculateTotalSales();
    const totalResale = this.calculateTotalResale();
    const profit = totalResale - totalSales;
    return profit;
  }

  profitsPercentage(): number {
    const totalSales = this.calculateTotalSales();
    const totalResale = this.calculateTotalResale();

    // Calcula o lucro como a diferença entre as vendas totais e os custos totais
    const profit = totalResale - totalSales;

    // Calcula a porcentagem de lucro
    const profitPercentage = (profit / totalSales) * 100;

    return profitPercentage;
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
