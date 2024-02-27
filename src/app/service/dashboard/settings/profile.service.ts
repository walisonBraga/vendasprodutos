import { Auth, updateProfile } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, CollectionReference, deleteDoc, doc, docData, DocumentReference, DocumentSnapshot, Firestore, getDoc, getFirestore, serverTimestamp, setDoc, updateDoc, } from '@angular/fire/firestore';
import { filter, from, map, Observable, of, shareReplay, switchMap } from 'rxjs';
import { Register } from '../../../modules/interface/register.interface';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(private firestore: Firestore, private afAuth: Auth) { }

  addUser(user: Register) {
    const userRef = collection(this.firestore, 'Register');
    return from(addDoc(userRef, { ...user }));
  }

  // getUser(uid: string): Observable<Register | undefined> {
  //   const userRef = doc(this.firestore, 'Register', uid);
  //   return from(userRef.get('')).pipe(
  //     map((docSnapshot: DocumentSnapshot<Register>) => {
  //       if (docSnapshot.exists()) {
  //         return { id: docSnapshot.id, ...docSnapshot.data() } as Register;
  //       } else {
  //         return undefined;
  //       }
  //     })
  //   );
  // }

  updateProfile(id: string): Observable<Register> {
    const productDocRef = doc(this.firestore, 'Register', id);
    return from(updateDoc(productDocRef, { ...productDocRef })) as unknown as Observable<Register>;
  }

  // updateProfile(id: string, newData: Partial<Register>): Observable<any> {
  //   const productDocRef = doc(this.firestore, 'Register', id);
  //   const dataToUpdate = { ...productDocRef, ...newData };
  //   return from(updateDoc(productDocRef, dataToUpdate)) as unknown as Observable<Register>;
  // }


}
