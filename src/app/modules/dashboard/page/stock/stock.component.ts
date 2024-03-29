import { UpdateProductsService } from './../../../../service/dashboard/update-products.service';
import { UpdateProducts } from './../../../interface/dashboard/updateProducts';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AddProducts } from '../../../interface/dashboard/addProducts.interface';
import { AddProductsService } from '../../../../service/dashboard/add-products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../../../service/Notification/Notification.service';
import { Storage, ref, uploadBytes } from '@angular/fire/storage';
import { getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { Table } from 'primeng/table';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrl: './stock.component.scss',
  providers: [ConfirmationService, MessageService],
})
export class StockComponent implements OnInit {
  stockSForm!: FormGroup;
  stocks: AddProducts[] = [];
  responsiveOptions: any[] | undefined;
  price: number = 123.45;
  visible: boolean = false;
  @ViewChild('dt') table!: Table;
  noRecordsMessage = 'Nenhum item encontrado';

  update!: UpdateProducts | undefined;

  value!: true;
  changeItens!: true;
  description!: false;
  inventoryStatus!: false;
  category!: false;

  sidebarVisible2: boolean = false;

  selectedProducts!: UpdateProducts[] | null;

  constructor(
    private addProductsService: AddProductsService,
    private notificationService: NotificationService,
    private updateProductsService: UpdateProductsService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private storage: Storage,
    private fb: FormBuilder,
    private router: Router,
  ) {

    this.stockSForm = new FormGroup({
      imgProducts: new FormControl(''),
      nome: new FormControl('', Validators.required),
      description: new FormControl(''),
      inventoryStatus: new FormControl(''),
      category: new FormControl(''),
      price: new FormControl(0, Validators.required),
      quantity: new FormControl(0, Validators.required)
    });
  }

  filterGlobal(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.table.filterGlobal(filterValue, 'contains');

    // Verifica se nenhum item foi encontrado e atualiza a mensagem
    if (this.table.filteredValue && this.table.filteredValue.length === 0) {
      this.noRecordsMessage = 'Nenhum item encontrado';
    } else {
      this.noRecordsMessage = '';
    }
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

  adicionarNotificacao() {
    this.notificationService.adicionarNotificacao();
  }

  onImageError(event: any) {
    event.target.src = '../../../../../assets/img_Products/semImagem.jpg'; // Caminho da imagem de substituição
  }


  ngOnInit() {
    this.addProductsService.getAddProducts('').subscribe(addProducts => {
      this.stocks = addProducts;
    });
    this.updateStocks();
  }

  private updateStocks(): void {
    this.updateProductsService.getProducts().subscribe((data) => {
      // Assuming `data` is the array of products received from the service
      if (data && data.length > 0) {
        const product = data[0]; // Assuming you're initializing with the first product
        this.stockSForm = this.fb.group({
          imgProducts: new FormControl(product.imgProducts),
          nome: new FormControl(product.nome),
          description: new FormControl(product.description),
          inventoryStatus: new FormControl(product.inventoryStatus),
          category: new FormControl(product.category),
          price: new FormControl(product.price),
          quantity: new FormControl(product.quantity),
        });
      }
    });
  }



  deleteProduct(uid: string): void {
    // Obtém o nome do usuário atual ou define como "Unknown" se não houver usuário autenticado

    this.addProductsService.deleteProduct(uid)
      .then(() => {
        console.log('Produto excluído com sucesso.');
        this.confirmationService.confirm({
          message: `Do you want to delete this record? (Deleted by:})`,
          header: 'Delete Confirmation',
          icon: 'pi pi-info-circle',
          acceptButtonStyleClass: "p-button-danger p-button-text",
          rejectButtonStyleClass: "p-button-text p-button-text",
          acceptIcon: "none",
          rejectIcon: "none",
          accept: () => {
            this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' });
          },
          reject: () => {
            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
          }
        });
      })
      .catch((error) => {
        console.error('Erro ao excluir o produto:', error);
      });
  }


  uploadImage($event: any) {
    const file = $event.target.files[0];

    const imgRef = ref(this.storage, `img_Products/${file.name}`);
    const uploadTask = uploadBytesResumable(imgRef, file);
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      console.log('Arquivo disponível em', downloadURL);
      this.stockSForm.get('imgProducts')?.setValue(downloadURL)
    });
    console.log(imgRef.storage);
    uploadBytes(imgRef, file)
      .then(response => console.log(response))
      .catch(error => console.log(error));
  }

  closeDialog() {
    this.visible = false;
  }


  showDialog(id: string): void {
    this.visible = true;
    this.updateProductsService.getProducts().subscribe((itens) => {
      this.update = itens.find(item => item.uid === id);
      console.log(this.update);
      if (this.update == null) {
        alert("Produto não encontrado!");
        location.reload();
      } else {
        // Preencher os campos do formulário com os detalhes do item selecionado
        this.stockSForm.patchValue({
          imgProducts: this.update.imgProducts,
          nome: this.update.nome,
          description: this.update.description,
          inventoryStatus: this.update.inventoryStatus,
          category: this.update.category,
          price: this.update.price,
          quantity: this.update.quantity
        });
      }
    })
  }


  changeItem() {
    this.visible = true;
  }

  updateStock(id: any): void {
    if (this.update != null) {
      const updatedItem: UpdateProducts = {
        ...this.update,
        imgProducts: this.stockSForm.value.imgProducts,
        nome: this.stockSForm.value.nome,
        description: this.stockSForm.value.description,
        inventoryStatus: this.stockSForm.value.inventoryStatus,
        category: this.stockSForm.value.category,
        price: this.stockSForm.value.price,
        quantity: this.stockSForm.value.quantity
      };

      this.updateProductsService.updateProduct(updatedItem).then(() => {
        console.log('Item atualizado com sucesso no Firestore!');
        this.closeDialog();
      }).catch(error => {
        console.error('Erro ao atualizar item no Firestore:', error);
        // Trate o erro conforme necessário
      });
    }
  }

}
