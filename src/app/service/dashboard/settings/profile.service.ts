import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, doc, DocumentReference, Firestore, updateDoc } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { Register } from '../../../modules/interface/register.interface';
import { AuthService } from '../../auth.service';
import { User } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private user!: User;

  constructor(private firestore: Firestore, private afAuth: AuthService) {}

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
      try {
        const profileId = update.uid;
        const profileRef: DocumentReference = doc(this.firestore, 'Register', profileId);
        await updateDoc(profileRef, { ...update });
        console.log('Perfil atualizado com sucesso:', update);
      } catch (error) {
        console.error('Erro ao atualizar perfil:', error);
        throw new Error('Erro ao atualizar perfil');
      }
    } else {
      console.error('Dados inválidos para atualização do perfil:', update);
      throw new Error('Dados inválidos para atualização do perfil');
    }
  }

  async updateEmail(newEmail: string): Promise<void> {
    const currentUser = this.afAuth.getCurrentUser();
    try {
      await currentUser.updateEmail(newEmail);
      console.log('Email atualizado com sucesso');
    } catch (error) {
      console.error('Erro ao atualizar o email:', error);
      throw error;
    }
  }

  async updatePassword(newPassword: string): Promise<void> {
    const currentUser = this.afAuth.getCurrentUser();
    try {
      await currentUser.updatePassword(newPassword);
      console.log('Senha atualizada com sucesso');
    } catch (error) {
      console.error('Erro ao atualizar a senha:', error);
      throw error;
    }
  }
}
