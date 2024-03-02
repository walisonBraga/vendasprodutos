import { AddProducts } from './../../modules/interface/dashboard/addProducts.interface';
import { DocumentData, DocumentReference, Firestore, addDoc, collection, collectionData, deleteDoc, deleteField, doc, docData, getDocs, query, serverTimestamp, updateDoc, where } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { Auth, User } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AddProductsService {
  private user!: User;

  constructor(private firestore: Firestore, private afAuth: Auth) { }

  addProducts(addProducts: AddProducts, id?: string) {
    const addProductsRef = collection(this.firestore, 'addProducts');
    return addDoc(addProductsRef, { ...addProducts, uid: id || doc(addProductsRef).id });
  }

  getAddProducts(id: string): Observable<AddProducts[]> {
    const productsRef = collection(this.firestore, 'addProducts' + id);
    return collectionData(productsRef, { idField: 'uid' }) as Observable<AddProducts[]>;
  }


  // updateProduct(uid: string, newData: Partial<AddProducts>): Promise<void> {
  //   const productDoc = doc(this.firestore, `addProducts/${uid}`);
  //   return updateDoc(productDoc, newData);
  // }

  deleteProduct(uid: string): Promise<void> {
    const productDelete = doc(this.firestore, 'addProducts', uid);
    return deleteDoc(productDelete);
  }

  updateProduct(uid: string, newData: Partial<AddProducts>): Promise<void> {
    const productDoc = doc(this.firestore, 'addProducts', uid);
    return updateDoc(productDoc, newData);
}
}

