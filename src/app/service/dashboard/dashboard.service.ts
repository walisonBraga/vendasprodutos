import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, deleteDoc, doc, getDocs, setDoc, updateDoc } from '@angular/fire/firestore';
import { AddProducts } from '../../modules/interface/dashboard/addProducts.interface';
import { Observable, from, of } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  getAllItems: any;

  constructor(private firestore: Firestore) { }

  addUse(user: AddProducts): Observable<any> {
    const ref = doc(this.firestore, 'addProducts', user?.nome);
    return from(setDoc(ref, user))
  }

  updateProduct(product: AddProducts): Observable<AddProducts> {
    return of(product); // Retorna um Observable com o produto atualizado
  }

  deleteProduct(productId: string) {
    const productDoc = doc(this.firestore, `addProducts/${productId}`);
    return deleteDoc(productDoc);
  }

}
