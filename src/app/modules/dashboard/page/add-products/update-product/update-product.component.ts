import { UpdateProductsService } from './../../../../../service/dashboard/update-products.service';
import { UpdateProducts } from './../../../../interface/dashboard/updateProducts';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage, ref, uploadBytes } from '@angular/fire/storage';
import { getDownloadURL, uploadBytesResumable } from 'firebase/storage';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent implements OnInit {
  updateProductsForm!: FormGroup;
  value!: true;
  statuses!: any[];
  description!: false;
  inventoryStatus!: false;
  category!: false;
  productId!: string;
  productDetails!: UpdateProducts;

  updateItens: UpdateProducts[] = [];

  constructor(
    private updateProductsService: UpdateProductsService,
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

  }



  updateOnSubmit(): void {

  }



  uploadImage($event: any): void {
    const file = $event.target.files[0];
    const imgRef = ref(this.storage, `img_Products/${file.name}`);
    const uploadTask = uploadBytesResumable(imgRef, file);

    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      console.log('Arquivo disponível em', downloadURL);
      this.updateProductsForm.get('imgProducts')?.setValue(downloadURL);
    });

    console.log(imgRef.storage);
    uploadBytes(imgRef, file)
      .then(response => console.log(response))
      .catch(error => console.log(error));
  }

  getSeverity(status: string): string {
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
