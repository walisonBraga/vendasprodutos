import { Injectable } from '@angular/core';
import { Auth, User, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from '@angular/fire/auth';
import { Firestore, collection, getDocs, query, where } from '@angular/fire/firestore';
import { Register } from '../modules/interface/register.interface';
import { from, switchMap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user!: User;

  constructor(public afAuth: Auth, private firestore: Firestore, private router: Router) {
    // this.afAuth.onAuthStateChanged((user) => {
    //   if (user) {
    //     console.log('User ID:', user.uid);
    //   }
    // });
  }

  async login(email: string, password: string) {
    const result = await signInWithEmailAndPassword(this.afAuth, email, password);
    localStorage.setItem('auth-credential', JSON.stringify(result.user));
    return result;
  }

  async register(email: string, password: string) {
    const result = await createUserWithEmailAndPassword(this.afAuth, email, password);
    return result;
  }

  async logout() {
    // try {
    //   await this.afAuth.signOut();
    //   this.router.navigate(['/login']); // Redireciona para a página de login após o logout
    // } catch (error) {
    //   console.error('Erro ao fazer logout:', error);
    // }
  }
  // isLoggedIn(): boolean {
  //   // Check if user is logged in by checking if user object exists
  //   const authData = localStorage.getItem('auth-credential');
  //   this.user = JSON.parse(String(authData)) || null;
  //   return !!this.user;
  // }

  // signOut() {
  //   localStorage.removeItem('auth-credential');
  //   const userInfo = localStorage.getItem('user-credential');
  //   if (userInfo) {
  //     JSON.parse(userInfo);
  //   }
  //   return this.afAuth.signOut();
  // }

  getCurrentUser() {
    this.user = JSON.parse(localStorage.getItem('auth-credential')!);
    const userInfo = JSON.parse(localStorage.getItem('user-credential')!);
    return userInfo;
  }

  getUserInfo(id: string): void {
    const registerRef = collection(this.firestore, 'Register');
    const queryResponse = query(registerRef, where("uid", "==", id));
    getDocs(queryResponse).then(res => {
      if (res) {
        const data = res.docs[0].data();
        delete data['password'];
        localStorage.setItem('user-credential', JSON.stringify(data));
      }
    })
  }


  isLoggedIn(): boolean {
    return !!this.afAuth.currentUser;
  }
}
