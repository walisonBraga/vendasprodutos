import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../service/auth.service';
import { Storage, ref, uploadBytes } from '@angular/fire/storage';
import { getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { ProfileService } from '../../../../service/dashboard/settings/profile.service';
import { Firestore, collection, deleteDoc, doc, getDoc, setDoc, updateDoc } from '@angular/fire/firestore';

import { RegisterService } from '../../../../service/register.service';
import { updateCurrentUser, updatePassword } from '@angular/fire/auth';
import { Register } from '../../../interface/register.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;
  value: any;
  user: any;

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
    private register: RegisterService,
    private auth: AuthService,
    private storage: Storage,
    private firestore: Firestore
  ) { }

  ngOnInit(): void {
    // Inicialização do formulário
    this.profileForm = this.fb.group({
      imgUrl: ['', Validators.required], // Imagem do perfil
      nome: ['', Validators.required], // Nome
      sobrenome: ['', Validators.required], // Sobrenome
      email: ['', [Validators.required, Validators.email]], // E-mail
      password: ['', [Validators.required, Validators.minLength(6)]] // Senha
    });
    this.initializeForm();
    this
  }

  private initializeForm(): void {
    this.user = this.auth.getCurrentUser();
    this.profileForm = this.fb.group({
      nome: new FormControl(this.user?.nome),
      sobrenome: new FormControl(this.user?.sobrenome),
      email: new FormControl(this.user?.email),
      password: new FormControl(this.user?.password),
      imgUrl: new FormControl(this.user?.imgUrl)
    });
  }

  uploadImage(event: any): void {
    const file = event.target.files[0];
    const imgRef = ref(this.storage, `img_Register/${file.nome}`);

    const uploadTask = uploadBytesResumable(imgRef, file);
    uploadTask.then(snapshot => {
      getDownloadURL(snapshot.ref)
        .then(downloadURL => {
          console.log('Arquivo disponível em', downloadURL);
          this.profileForm.get('imgUrl')?.setValue(downloadURL);
        }).catch(error => console.error('Error getting download URL:', error));
    }).catch(error => console.error('Error uploading file:', error));
  }

  async updateProfile(): Promise<void> {
    try {
      if (this.profileForm.invalid) return;
      const user = await this.auth.getCurrentUser();
      const userId = user?.uid;
      if (!userId) {
        console.error('Nenhum usuário autenticado.');
        return;
      }
      console.log('User ID:', userId); // Add this line to print the value of userId
      const profileRef = doc(this.firestore, `Register/${userId}`);
      const userDataToUpdate = {
        imgUrl: this.profileForm.get('imgUrl')?.value,
        nome: this.profileForm.get('nome')?.value,
        sobrenome: this.profileForm.get('sobrenome')?.value,
        email: this.profileForm.get('email')?.value,
        password: this.profileForm.get('password')?.value
      };
      await setDoc(profileRef, userDataToUpdate, { merge: true });
      console.log('Perfil atualizado com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
    }
  }


  // async updateProfile(): Promise<void> {
  // if (this.profileForm.invalid) return;
  // const user = this.auth.getCurrentUser();
  // const profileRef = doc(this.firestore, `Register/${user.uid}`);
  // try {
  //   if (!user) {
  //     console.error('Nenhum usuário autenticado.');
  //     return;
  //   }

  //   const userDataToUpdate = {
  //     imgUrl: this.profileForm.get('imgUrl')?.value,
  //     nome: this.profileForm.get('nome')?.value,
  //     sobrenome: this.profileForm.get('sobrenome')?.value,
  //     email: this.profileForm.get('email')?.value,
  //     password: this.profileForm.get('password')?.value
  //   };

  // Atualizar o perfil do usuário no Firestore
  //   await setDoc(profileRef, userDataToUpdate, { merge: true });
  //   console.log('Perfil atualizado com sucesso!');
  // } catch (error) {
  //   console.error('Erro ao atualizar perfil:', error);
  //   // Se necessário, você pode exibir uma mensagem de erro ao usuário
  // }
  //}
  // async updateUser(event: String): Promise<void> {
  //   if (this.profileForm.invalid) return;
  //   const user = this.auth.getCurrentUser();
  //   const profileRef = doc(this.firestore, `Register/${user.uid}`);
  //   try {
  //     if (!user) {
  //       console.error('Nenhum usuário autenticado.');
  //       return;
  //     }

  //     const userDataToUpdate = {
  //       imgUrl: this.profileForm.get('imgUrl')?.value,
  //       nome: this.profileForm.get('nome')?.value,
  //       sobrenome: this.profileForm.get('sobrenome')?.value,
  //       email: this.profileForm.get('email')?.value,
  //       password: this.profileForm.get('password')?.value
  //     };

  //     // Atualizar o perfil do usuário no Firestore
  //     await updateDoc(profileRef, userDataToUpdate);
  //     console.log('Perfil atualizado com sucesso!');
  //   } catch (error) {
  //     console.error('Erro ao atualizar perfil:', error);
  //   }
  // }



}
