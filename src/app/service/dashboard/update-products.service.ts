import { Injectable } from '@angular/core';
import { UpdateProducts } from '../../modules/interface/dashboard/updateProducts';
import { Observable } from 'rxjs';
import { DocumentReference, Firestore, collection, collectionData, doc, updateDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UpdateProductsService {
  constructor(private firestore: Firestore) { }

  getAddProducts(id: string): Observable<UpdateProducts[]> {
    const productsRef = collection(this.firestore, 'addProducts' + id);
    return collectionData(productsRef, { idField: 'uid' }) as Observable<UpdateProducts[]>;
  }



  async updateProduct(id: string, product: UpdateProducts) {
    const docRef = doc(this.firestore, `addProducts/${id}`);
    const updatedData = {
      name: product.nome,
      price: product.price,
      description: product.description,

    };
    await updateDoc(docRef, updatedData);
  }
}
