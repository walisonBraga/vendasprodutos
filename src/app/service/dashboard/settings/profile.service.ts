import { Auth, User } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, CollectionReference, doc, DocumentReference, Firestore, getDoc, setDoc, updateDoc, } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { Register } from '../../../modules/interface/register.interface';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private user!: User;

  constructor(private firestore: Firestore, private afAuth: Auth) { }

  addUser(user: Register) {
    const userRef = collection(this.firestore, 'Register');
    return from(addDoc(userRef, { ...user }));
  }

  getProfile(id: string): Observable<Register[]> {
    const profileRef = collection(this.firestore, 'Register' + id);
    return collectionData(profileRef, { idField: 'uid' }) as Observable<Register[]>;
  }

  getUserById(userId: string): Observable<Register | undefined> {
    const userRef = doc(this.firestore, 'Register', userId);
    return new Observable<Register | undefined>(observer => {
      getDoc(userRef).then(docSnapshot => {
        if (docSnapshot.exists()) {
          const userData = docSnapshot.data() as Register;
          observer.next(userData);
        } else {
          observer.next(undefined); // Documento não encontrado
        }
        observer.complete();
      }).catch(error => {
        observer.error(error); // Tratar erro, se necessário
      });
    });
  }


  async updateProfile(update: Register): Promise<void> {
    const productId = update.uid;
    const productRef: DocumentReference = doc(this.firestore, 'Register', productId);
    await setDoc(productRef, { ...update } );
  }
}
