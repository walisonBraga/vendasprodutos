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
    const profileRef = collection(this.firestore, 'Register');
    return collectionData(profileRef, { idField: 'uid' }) as Observable<Register[]>;
  }

  async updateProfile(update: Register): Promise<void> {
    if (update.uid && update.nome && update.sobrenome && update.email && update.password) {
      const profileId = update.uid;
      const profileRef: DocumentReference = doc(this.firestore, 'Register', profileId);
      await setDoc(profileRef, { ...update });
    } else {
      console.error('Dados inválidos para atualização do perfil:', update);
      throw new Error('Dados inválidos para atualização do perfil');
    }
  }


}
