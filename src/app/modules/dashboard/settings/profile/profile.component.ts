import { user } from '@angular/fire/auth';
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
    this.updateProfile('');
  }

  updateProfile(uid: string): void {
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

          // Exibir a imagem como uma pré-visualização
          const img = document.createElement('img');
          img.src = downloadURL;
          img.classList.add('imgProfile');

          const imageContainer = document.querySelector('.image-task');
          if (imageContainer) {
            // Limpar o contêiner de imagem antes de adicionar a nova imagem
            imageContainer.innerHTML = '';
            // Adicionar a nova imagem ao contêiner
            imageContainer.appendChild(img);
          }
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
    if (this.profileForm.valid && this.user != null) {
      const userData: Register = {
        ...this.user!,
        imgUrl: this.profileForm.value.imgUrl,
        nome: this.profileForm.value.nome,
        sobrenome: this.profileForm.value.sobrenome,
        email: this.profileForm.value.email,
        password: this.profileForm.value.password || '' // Defina um valor padrão para o campo de senha
      };

      // Verifica se o campo de senha não está vazio antes de atualizar o perfil
      if (userData.password !== undefined && userData.password !== '') {
        this.profileService.updateProfile(userData)
          .then(() => {
            console.log('Perfil atualizado com sucesso:', userData);
            // Chama updateProfile novamente para atualizar o formulário com os novos dados
            this.updateProfile(userData.uid);
          })
          .catch(error => {
            console.log('Erro ao atualizar o perfil:', error.message);
          });
      } else {
        console.log('A senha não pode estar vazia.');
      }
    } else {
      console.log('Por favor, preencha todos os campos obrigatórios.');
    }
  }



}

