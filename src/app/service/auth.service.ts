import { Injectable } from '@angular/core';
import { Auth, User, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, collection, getDocs, query, where } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user!: User;

  constructor(public afAuth: Auth, private firestore: Firestore, private router: Router) { }

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
    try {
      await this.afAuth.signOut();
      this.router.navigate(['/login']); // Redireciona para a página de login após o logout
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  }

  getCurrentUser() {
    this.user = JSON.parse(localStorage.getItem('auth-credential')!);
    const userInfo = JSON.parse(localStorage.getItem('user-credential')!);
    return userInfo;
  }

  getUserInfo(id: string): void {
    const registerRef = collection(this.firestore, 'Register');
    const queryResponse = query(registerRef, where("uid", "==", id));
    getDocs(queryResponse)
      .then(res => {
        if (res && res.docs.length > 0) {
          const data = res.docs[0].data();
          if (data.hasOwnProperty('password')) {
            delete data['password'];
          }
          localStorage.setItem('user-credential', JSON.stringify(data));
        } else {
          console.error("No user found with the provided ID.");
        }
      })
      .catch(error => {
        console.error("Error retrieving user information:", error);
      });
  }

  isLoggedIn(): boolean {
    return !!this.afAuth.currentUser;
  }
}
