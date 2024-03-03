import { UpdateProductsService } from './../../../../service/dashboard/update-products.service';
import { Component, OnInit, inject } from '@angular/core';
import { AddProductsService } from '../../../../service/dashboard/add-products.service';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AddProducts } from '../../../interface/dashboard/addProducts.interface';
import { Storage, ref, uploadBytes } from '@angular/fire/storage';
import { getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { ConfirmationService, MessageService } from 'primeng/api';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { NotificationService } from '../../../../service/Notification/Notification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Firestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrl: './add-products.component.scss',
  providers: [MessageService, ConfirmationService,MatFormFieldModule, MatSelectModule, FormsModule, ReactiveFormsModule],

})
export class AddProductsComponent implements OnInit {
  addProductsForm!: FormGroup;
  products: AddProducts[] = [];
  updateProducts: AddProducts[] = [];
  value!: true;
  statuses!: any[];
  description!: false;
  inventoryStatus!: false;
  category!: false;

  uid: string | null = null;
  id!: string;

  visible: boolean = false;

  showDialog() {
      this.visible = true;
  }

  closeDialog() {
      this.visible = false;
  }

  constructor(
    private updateProductsService: UpdateProductsService,
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private storage: Storage,
    public confirmationService: ConfirmationService,
    public messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private firestore: Firestore
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

  onImageError(event: any) {
    event.target.src = '../../../../../assets/img_Products/_9e6da119-bf43-4454-8203-8226c263bb6c.jpg'; // Caminho da imagem de substituição
  }


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
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
      uid: ''
    };
    this.updateProductsService.addProducts(addProducts)
      .then(response => {
        console.log('Produto adicionado com sucesso:', response);
        // adicionar o produto à lista
        this.products.push(addProducts);
        this.notificationService.adicionarNotificacao();

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
