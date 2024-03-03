import { ProfileService } from './../../../../service/dashboard/settings/profile.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../service/auth.service';
import { Storage, ref } from '@angular/fire/storage';
import { getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { Firestore } from '@angular/fire/firestore';

import { Register } from '../../../interface/register.interface';
import { UntilDestroy } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;
  user: any;

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
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
    const storageRef = ref(this.storage, `img_Register/${file.name}`);

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

  profileUpdate(uid: string) {
    if (this.user && this.profileForm.valid) {
      const updatedProfile: Register = {
        ...this.user,
        imgUrl: this.profileForm.value.imgUrl,
        nome: this.profileForm.value.nome,
        sobrenome: this.profileForm.value.sobrenome,
        email: this.profileForm.value.email,
        password: this.profileForm.value.password
      };

      this.profileService.updateProfile(updatedProfile).then(() => {
        console.log('Perfil atualizado com sucesso no Firestore!');
      }).catch(error => {
        console.error('Erro ao atualizar perfil no Firestore:', error);
        // Trate o erro conforme necessário (por exemplo, exibindo uma mensagem de erro para o usuário)
      });
    } else {
      console.error('Erro: Usuário não definido ou formulário inválido.');
      // Trate o erro conforme necessário (por exemplo, exibindo uma mensagem de erro para o usuário)
    }
    return uid;
  }

}

