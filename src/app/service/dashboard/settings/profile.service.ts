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
    // Verificar se todas as informações necessárias estão presentes no objeto de atualização
    if (update.uid && update.nome && update.sobrenome && update.email && update.password) {
      try {
        // Obter o ID do perfil a ser atualizado
        const profileId = update.uid;

        // Referência ao documento do perfil no Firestore
        const profileRef: DocumentReference = doc(this.firestore, 'Register', profileId);

        // Atualizar o documento do perfil com as informações fornecidas
        await updateDoc(profileRef, { ...update });

        console.log('Perfil atualizado com sucesso:', update);
      } catch (error) {
        console.error('Erro ao atualizar perfil:', error);
        throw new Error('Erro ao atualizar perfil');
      }
    } else {
      // Se algumas informações necessárias estiverem ausentes, registre um erro e lance uma exceção
      console.error('Dados inválidos para atualização do perfil:', update);
      throw new Error('Dados inválidos para atualização do perfil');
    }
  }
}
