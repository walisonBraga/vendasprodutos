import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { RegisterService } from '../../service/register.service';
import { MessageService } from 'primeng/api';
import { Storage, ref, uploadBytes } from '@angular/fire/storage';
import { getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  providers: [MessageService],
})
export class RegisterComponent {
  registerForm!: FormGroup;
  value!: string;

  constructor(
    fb: FormBuilder,
    private router: Router,
    private auth: AuthService,
    private register: RegisterService,
    private storage: Storage
  ) {
    this.registerForm = fb.group({
      imgUrl: ['', Validators.required],
      nome: ['', Validators.required],
      sobrenome: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      selectedPage: ['', Validators.required],
    });

  }

  async onSubmit() {
    if (this.registerForm.invalid) return;

    try {
      // Registra o usuário no serviço de autenticação
      const authResponse = await this.auth.register(
        this.registerForm.get('email')?.value,
        this.registerForm.get('password')?.value
      );

      // Cria um objeto com os dados do usuário, incluindo o UID retornado pela autenticação
      const userData = {
        ...this.registerForm.value,
        uid: authResponse.user?.uid
      };

      // Adiciona os dados do usuário ao Firestore ou ao banco de dados Firebase
      const registerRef = await this.register.addRegister(userData);

      // Reseta o formulário após o registro bem-sucedido
      // Redireciona o usuário para a página selecionada após o registro
      const selectedPage = this.registerForm.controls['selectedPage'].value;
      this.router.navigate([selectedPage]);
      this.registerForm.reset();
      return registerRef
    } catch (error) {
      console.error('Erro durante o registro:', error);
      // Tratar erros de registro, se necessário
    }
  }


  uploadImage($event: any) {
    const file = $event.target.files[0];

    const imgRef = ref(this.storage, `img_Register/${file.nome}`);
    const uploadTask = uploadBytesResumable(imgRef, file);
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      console.log('Arquivo disponível em', downloadURL);
      this.registerForm.get('imgUrl')?.setValue(downloadURL)
    });

    console.log(imgRef.storage);

    uploadBytes(imgRef, file)
      .then(response => console.log(response))
      .catch(error => console.log(error));

  }
}
