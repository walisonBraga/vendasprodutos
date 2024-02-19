import { Injectable } from "@angular/core";
import { Firestore, collection, addDoc, collectionData } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { Register } from "../modules/interface/register.interface";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  constructor(private firestore: Firestore) { }

  addRegister(register: Register) {
    const registerRef = collection(this.firestore, 'Register');
    return addDoc(registerRef, register);
  }

  getRegister(id: string): Observable<Register[]> {
    const registerRef = collection(this.firestore, 'Register');
    return collectionData(registerRef, { idField: id }) as Observable<Register[]>;

  }


}
