import { UpdateProductsService } from './../../../../service/dashboard/update-products.service';
import { UpdateProducts } from './../../../interface/dashboard/updateProducts';
import { Storage } from '@angular/fire/storage';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AddProducts } from '../../../interface/dashboard/addProducts.interface';
import { Sidebar } from 'primeng/sidebar';
import { AddProductsService } from '../../../../service/dashboard/add-products.service';
import { Firestore } from 'firebase/firestore';
import { AuthService } from '../../../../service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../../../service/Notification/Notification.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrl: './stock.component.scss'
})
export class StockComponent implements OnInit {
  stockSForm!: FormGroup;
  stocks: AddProducts[] = [];
  responsiveOptions: any[] | undefined;
  price: number = 123.45;
  sidebarVisible: boolean = false;
  visible: boolean = false;
  statuses!: any[];

  updateProduct!: UpdateProducts;

  UpdateProducts!: String;
  @ViewChild('sidebarRef') sidebarRef!: Sidebar;

  constructor(
    private addProductsService: AddProductsService,
    private notificationService: NotificationService,
    private updateProductsService: UpdateProductsService,
    private route: ActivatedRoute,
  ) {

    this.stockSForm = new FormGroup({
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

  closeCallback(e: Event): void {
    this.sidebarRef.close(e);
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

  modalShow(uid: string): void {
    this.visible = true;
    this.updateProductsService.getAddProducts('uid').subscribe((data: any) => {
      console.log("DADOS DO SERVIÇO ADD PRODUCTS", data);
      this.statuses = data.statuses;
    })
  }

  adicionarNotificacao() {
    this.notificationService.adicionarNotificacao();
  }

  ngOnInit() {
    this.addProductsService.getAddProducts('').subscribe(addProducts => {
      this.stocks = addProducts;
    });
  }

  deleteProduct(uid: string): void {
    this.addProductsService.deleteProduct(uid)
      .then(() => {
        console.log('Produto excluído com sucesso.');
      })
      .catch((error) => {
        console.error('Erro ao excluir o produto:', error);

      });
  }

  openUpdateModal(product: UpdateProducts) {
    this.updateProduct = product; // Salve os dados do produto que você deseja editar
    this.updateProduct.patchValue({
      nome: product.nome,
      description: product.description,
      inventoryStatus: product.inventoryStatus,
      category: product.category,
      price: product.price,
      quantity: product.quantity,
    });
    // Abra o modal aqui
  }


  atualizarProduto(): void {
    this.addProductsService
  }


  updateProducts() { }
}
