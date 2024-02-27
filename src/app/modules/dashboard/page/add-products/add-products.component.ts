import { Component, OnInit, inject } from '@angular/core';
import { AddProductsService } from '../../../../service/dashboard/add-products.service';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AddProducts } from '../../../interface/dashboard/addProducts.interface';
import { Storage, ref, uploadBytes } from '@angular/fire/storage';
import { getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { ConfirmationService, MessageService } from 'primeng/api';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ThemePalette } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DashboardHomeComponent } from '../dashboard-home/dashboard-home.component';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrl: './add-products.component.scss',
  providers: [MessageService, ConfirmationService,MatFormFieldModule, MatSelectModule, FormsModule, ReactiveFormsModule],

})
export class AddProductsComponent implements OnInit {
  addProductsForm!: FormGroup;
  products: AddProducts[] = [];
  value!: true;
  statuses!: any[];
  description!: false;
  inventoryStatus!: false;
  category!: false;

  constructor(
    private addProductsService: AddProductsService,
    private fb: FormBuilder,
    private storage: Storage,
    public confirmationService: ConfirmationService,
    public messageService: MessageService
  ) {
    this.addProductsForm = this.fb.group({
      imgProducts: ['', Validators.required],
      nome: ['', Validators.required],
      description: ['', Validators.required],
      inventoryStatus: ['', Validators.required],
      category: ['', Validators.required],
      price: ['', Validators.required],
      quantity: ['', Validators.required],
    });

  }
  ngOnInit(): void {

  }

  async addProductsSubmit() {
    const addProducts: AddProducts = {
      imgProducts: this.addProductsForm.value.imgProducts,
      nome: this.addProductsForm.value.nome,
      description: this.addProductsForm.value.description,
      inventoryStatus: this.addProductsForm.value.inventoryStatus,
      category: this.addProductsForm.value.category,
      price: this.addProductsForm.value.price,
      quantity: this.addProductsForm.value.quantity,
    };
    this.addProductsService.addProducts(addProducts)
      .then(response => {
        console.log('Produto adicionado com sucesso:', response);
        // adicionar o produto à lista
        this.products.push(addProducts);

        // limpar o formulário
        this.addProductsForm.reset();
      }).catch(error => {
        console.error('Erro ao adicionar produto:', error);
      });

  }

  uploadImage($event: any) {
    const file = $event.target.files[0];

    const imgRef = ref(this.storage, `img_Products/${file.name}`);
    const uploadTask = uploadBytesResumable(imgRef, file);
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      console.log('Arquivo disponível em', downloadURL);
      this.addProductsForm.get('imgProducts')?.setValue(downloadURL)
    });
    console.log(imgRef.storage);
    uploadBytes(imgRef, file)
      .then(response => console.log(response))
      .catch(error => console.log(error));
  }

  // stt() {
  //   this.statuses = [
  //     { label: 'INSTOCK', value: 'instock' },
  //     { label: 'LOWSTOCK', value: 'lowstock' },
  //     { label: 'OUTOFSTOCK', value: 'outofstock' }
  //   ];
  // }

  getSeverity(status: string) {
    switch (status) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warning';
      case 'OUTOFSTOCK':
        return 'danger';
      default:
        throw new Error('Invalid status');
    }
  }
}
