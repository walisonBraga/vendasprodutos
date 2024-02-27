import { Injectable } from '@angular/core';
import { UpdateProducts } from '../../modules/interface/dashboard/updateProducts';
import { Observable } from 'rxjs';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { doc } from 'firebase/firestore/lite';
import { updateDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class UpdateProductsService {
  constructor(private firestore: Firestore) { }

  // updateProduct(product: UpdateProducts): Observable<UpdateProducts> {
  //   return this.http.put<UpdateProducts>(`addProducts/${product.id}`, product);
  // }

  getAddProducts(id: string): Observable<UpdateProducts[]> {
    const productsRef = collection(this.firestore, `addProducts/${id}/products`);
    return collectionData(productsRef, { idField: 'uid' }) as Observable<UpdateProducts[]>;
  }
  // getAddProducts(id: string): Observable<UpdateProducts[]> {
  //   const productsRef = collection(this.firestore, 'addProducts' + id);
  //   return collectionData(productsRef, { idField: 'uid' }) as Observable<UpdateProducts[]>;
  // }

//  updateProducts(id: string): Observable<UpdateProducts[]> {
//   const productsRef = collection(this.firestore, 'addProducts' + id);
//   return collectionData(productsRef, { idField: 'uid'}) as Observable<UpdateProducts[]>;
//  }

async updateProduct(id: string, product: UpdateProducts) {
  const productRef = doc(this.firestore, 'addProducts', id);
  await updateDoc(productRef, {...product});
}
}
