import { Component } from '@angular/core';
import { AddProductsService } from '../../../../service/dashboard/add-products.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddProducts } from '../../../interface/dashboard/addProducts.interface';
import { Storage, ref, uploadBytes } from '@angular/fire/storage';
import { getDownloadURL, uploadBytesResumable } from 'firebase/storage';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrl: './add-products.component.scss'
})
export class AddProductsComponent {
  addProductsForm!: FormGroup;
  products: AddProducts[] = [];



  constructor(
    private addProductsService: AddProductsService,
    private fb: FormBuilder,
    private storage: Storage
  ) {
    this.addProductsForm = this.fb.group({
      nome: ['', Validators.required],
      price: ['', Validators.required],
      imgProducts: ['', Validators.required],
    });
  }

  async addProductsSubmit() {
    const addProducts: AddProducts = {
      nome: this.addProductsForm.value.nome,
      price: this.addProductsForm.value.price,
      imgProducts: this.addProductsForm.value.imgProducts,
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
}
