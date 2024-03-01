import { UpdateProductsService } from './../../../../../service/dashboard/update-products.service';
import { UpdateProducts } from './../../../../interface/dashboard/updateProducts';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddProducts } from '../../../../interface/dashboard/addProducts.interface';
import { NotificationService } from '../../../../../service/Notification/Notification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Firestore } from 'firebase/firestore';
import { Storage, ref, uploadBytes } from '@angular/fire/storage';
import { getDownloadURL, uploadBytesResumable } from 'firebase/storage'

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.scss'
})
export class UpdateProductComponent {
  updateProductsForm!: FormGroup;
  updateProducts: AddProducts[] = [];
  value!: true;
  statuses!: any[];
  description!: false;
  inventoryStatus!: false;
  category!: false;


  updateId!: any;
  update: any;

  id!: string

  constructor(
    private updateProduct: UpdateProductsService,
    private notificationService: NotificationService,
    private route: ActivatedRoute,
    private storage: Storage,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.updateProductsForm = this.fb.group({
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
    this.updateId = this.route.snapshot.paramMap.get('uid');
    this.updateProduct.getAddProducts('').subscribe(res => {
      this.updateId = res;
      console.log(res);
    });
  }


  async UpdateProducts() {
    const addProducts: AddProducts = {
      imgProducts: this.updateProductsForm.value.imgProducts,
      nome: this.updateProductsForm.value.nome,
      description: this.updateProductsForm.value.description,
      inventoryStatus: this.updateProductsForm.value.inventoryStatus,
      category: this.updateProductsForm.value.category,
      price: this.updateProductsForm.value.price,
      quantity: this.updateProductsForm.value.quantity,
    };
  }

  uploadImage($event: any) {
    const file = $event.target.files[0];

    const imgRef = ref(this.storage, `img_Products/${file.name}`);
    const uploadTask = uploadBytesResumable(imgRef, file);
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      console.log('Arquivo disponível em', downloadURL);
      this.updateProductsForm.get('imgProducts')?.setValue(downloadURL)
    });
    console.log(imgRef.storage);
    uploadBytes(imgRef, file)
      .then(response => console.log(response))
      .catch(error => console.log(error));
  }

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
