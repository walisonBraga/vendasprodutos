import { AddProducts } from './../../modules/interface/dashboard/addProducts.interface';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, docData, getDocs, query, updateDoc, where } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AddProductsService {
  private user!: User;

  constructor(private firestore: Firestore) { }

  addProducts(addProducts: AddProducts, id?: string) {
    const addProductsRef = collection(this.firestore, 'addProducts');
    return addDoc(addProductsRef, { ...addProducts, uid: id || doc(addProductsRef).id });
  }

  getAddProducts(id: string): Observable<AddProducts[]> {
    const productsRef = collection(this.firestore, 'addProducts' + id);
    return collectionData(productsRef, { idField: 'uid' }) as Observable<AddProducts[]>;
  }

  updateProduct(productId: string, addProducts: AddProducts): any {
    const productDoc = doc(this.firestore, `addProducts/${productId}`);
    return productDoc;
  }

  deleteProduct(productId: string) {
    const productDoc = doc(this.firestore, `addProducts/${productId}`);
    return deleteDoc(productDoc);
  }

  // getProducts() {
  //   return this.addProductsCollection.valueChanges();
  // }


  // getProduct(productId: string) {
  //   const productDoc = doc(this.firestore, `addProducts/${productId}`);
  //   return docData(productDoc);
  // }

}
