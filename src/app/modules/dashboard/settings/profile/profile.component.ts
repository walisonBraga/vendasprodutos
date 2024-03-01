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
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { UntilDestroy } from '@ngneat/until-destroy';

@UntilDestroy()
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
  ) {
    this.profileForm = this.fb.group({
      imgUrl: ['', Validators.required], // Imagem do perfil
      nome: ['', Validators.required], // Nome
      sobrenome: ['', Validators.required], // Sobrenome
      email: ['', [Validators.required, Validators.email]], // E-mail
      password: ['', [Validators.required, Validators.minLength(6)]] // Senha
    });
  }

  ngOnInit(): void {
      this.auth.getCurrentUser();
    // Inicialização do formulário
    this.initializeForm();
  }

  private initializeForm(): void {
    this.user = this.auth.getCurrentUser();
    this.profileForm = this.fb.group({
      imgUrl: new FormControl(this.user?.imgUrl),
      nome: new FormControl(this.user?.nome),
      sobrenome: new FormControl(this.user?.sobrenome),
      email: new FormControl(this.user?.email),
      password: new FormControl(this.user?.password),
    });
  }

  uploadImage(event: any): void {
    const file = event.target.files[0];
    const storageRef = ref(this.storage, `img_Register/${file.nome}`);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.then(snapshot => {
      getDownloadURL(snapshot.ref)
        .then(downloadURL => {
          console.log('Arquivo disponível em', downloadURL);
          this.profileForm.get('imgUrl')?.setValue(downloadURL);
        })
        .catch(error => {
          console.error('Erro ao obter URL de download:', error);
        });
    })
    .catch(error => {
      console.error('Erro ao fazer upload do arquivo:', error);
    });
  }




  updateUser() {
    if (this.profileForm.invalid) return;
    // const user = this.auth.getCurrentUser();
    const user = `${this.user.sobrenome}`
    const profileRef = doc(this.firestore, `Register/${user}`);
    try {
      if (!user) {
        console.error('Nenhum usuário autenticado.');
        return;
      }

      const userDataToUpdate = {
        imgUrl: this.profileForm.get('imgUrl')?.value,
        nome: this.profileForm.get('nome')?.value,
        sobrenome: this.profileForm.get('sobrenome')?.value,
        email: this.profileForm.get('email')?.value,
        password: this.profileForm.get('password')?.value
      };

      // Atualizar o perfil do usuário no Firestore
      updateDoc(profileRef, userDataToUpdate);
      console.log('Perfil atualizado com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
    }
  }


}

