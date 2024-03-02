import { Injectable } from '@angular/core';
import { UpdateProducts } from '../../modules/interface/dashboard/updateProducts';
import { Observable } from 'rxjs';
import { DocumentReference, Firestore, addDoc, collection, collectionData, doc, getDocs, updateDoc } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class UpdateProductsService {
  constructor(private firestore: Firestore) { }

  addProducts(addProducts: UpdateProducts, id?: string) {
    const addProductsRef = collection(this.firestore, 'addProducts');
    return addDoc(addProductsRef, { ...addProducts, uid: id || doc(addProductsRef).id });
  }

  getProducts(): Observable<UpdateProducts[]> {
    const productsRef = collection(this.firestore, 'addProducts');
    return collectionData(productsRef, { idField: 'uid' }) as Observable<UpdateProducts[]>;
  }

  async listProduct() {
    const querySnapshot = await getDocs(collection(this.firestore, 'addProducts'));
    querySnapshot.forEach((doc) => {
      console.log(doc.id, ' => ', doc.data());
    });
  }

  async updateProduct(update: UpdateProducts): Promise<void> {
    const productId = update.uid;
    const productRef: DocumentReference = doc(this.firestore, 'addProducts', productId);
    await updateDoc(productRef, { ...update });
  }

}
