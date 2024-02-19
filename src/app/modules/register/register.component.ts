import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { RegisterService } from '../../service/register.service';
import { MessageService } from 'primeng/api';
import { Storage, ref, uploadBytes } from '@angular/fire/storage';
import { getDownloadURL, uploadBytesResumable } from 'firebase/storage';

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

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
    private messageService: MessageService,
    private storage: Storage
  ) {
    this.registerForm = fb.group({
      imgUrl: ['', Validators.required],
      nome: ['', Validators.required],
      sobrenome: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  //   this.registerForm = fb.group({
  //     imgUrl: this.auth.getCurrentUser() ? [this.auth.getCurrentUser().imgUrl] : ['', Validators.required],
  //     nome: this.auth.getCurrentUser() ? [this.auth.getCurrentUser().nome] : ['', Validators.required],
  //     sobrenome: this.auth.getCurrentUser() ? [this.auth.getCurrentUser().nome] : ['', Validators.required],
  //     email: this.auth.getCurrentUser() ? null : ['', [Validators.required, Validators.email]],
  //     password: this.auth.getCurrentUser() ? null : ['', Validators.required],
  //   });
  // }


  async onSubmit() {
    if (this.registerForm.invalid) return;
    const authResponse = await this.auth.register(this.registerForm.get('email')?.value, this.registerForm.get('password')?.value);

    const body = {
      ...this.registerForm.value,
      'uid': authResponse.user.uid,
    }
    this.registerForm.reset();
    const registerRef = await this.register.addRegister(body);
    return registerRef;
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
