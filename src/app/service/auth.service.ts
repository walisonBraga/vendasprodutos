import { Injectable } from '@angular/core';
import { Auth, User, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, collection, getDocs, query, where } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user!: User;

  constructor(public afAuth: Auth, private firestore: Firestore) { }

  async login(email: string, password: string) {
    const result = await signInWithEmailAndPassword(this.afAuth, email, password);
    localStorage.setItem('auth-credential', JSON.stringify(result.user));
    return result;
  }

  async register(email: string, password: string) {
    const result = await createUserWithEmailAndPassword(this.afAuth, email, password);
    return result;
  }

  isLoggedIn(): boolean {
    // Check if user is logged in by checking if user object exists
    const authData = localStorage.getItem('auth-credential');
    this.user = JSON.parse(String(authData)) || null;
    return !!this.user;
  }

  signOut() {
    localStorage.removeItem('auth-credential');
    return this.afAuth.signOut();
  }

  getCurrentUser() {
    this.user = JSON.parse(localStorage.getItem('auth-credential')!);
    const userInfo = JSON.parse(localStorage.getItem('user-credential')!);
    return userInfo;
  }

  // isLoggedIn(): boolean {
  //   const JWT_TOKEN = this.cookie.get('auth-credential');
  //   return JWT_TOKEN ? true : false;
  // }

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
}
