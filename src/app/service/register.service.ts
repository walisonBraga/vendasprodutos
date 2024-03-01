import { User, updateProfile } from '@angular/fire/auth';
import { Injectable } from "@angular/core";
import { Firestore, collection, addDoc, collectionData, updateDoc, doc } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { Register } from "../modules/interface/register.interface";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  user: any;
  profileForm: any;
  afs: any;
  constructor(private firestore: Firestore) { }

  addRegister(register: Register) {
    const registerRef = collection(this.firestore, 'Register');
    return addDoc(registerRef, register);
  }

  getRegister(id: string): Observable<Register[]> {
    const registerRef = collection(this.firestore, 'Register');
    return collectionData(registerRef, { idField: id }) as Observable<Register[]>;
  }

  updateProfile(id: string): Promise<void> {
    const profileRef = doc(this.firestore, `Register/${id}`);
    // Atualizar o perfil do usuário no Firestore
    return updateDoc(profileRef, { idField: id }) as Promise<void>;
  }


  // async updatePassword(userId: string, password: string): Promise<void> {
  //   const userDocRef = doc(this.firestore, `Register/${userId}`);

  //   try {
  //     await updateDoc(userDocRef, { password: password });
  //     console.log('Senha atualizada no Firestore com sucesso!');
  //   } catch (error) {
  //     console.error('Erro ao atualizar senha no Firestore:', error);
  //   }
  // }


}
