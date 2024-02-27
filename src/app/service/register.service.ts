import { User, updateCurrentUser, updateProfile } from '@angular/fire/auth';
import { Injectable } from "@angular/core";
import { Firestore, collection, addDoc, collectionData, updateDoc, doc } from "@angular/fire/firestore";
import { Observable, from, map, switchMap } from "rxjs";
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

  


  // async updateUser(id: any): Promise<Observable<Register>> {
  //   const userId = id(this.firestore, 'Register', 'uid');
  //   return from(updateCurrentUser(userId, { ...id })).pipe(
  //     switchMap(result => {
  //       // Perform some action after updating the user, such as querying for the updated user data
  //       return from(this.firestore('Register').doc(userId).get()).pipe(
  //         map(doc => {
  //           if (doc.exists) {
  //             return doc.data() as Register;
  //           } else {
  //             throw new Error('User not found');
  //           }
  //         })
  //       );
  //     })
  //   );
  // }


}
