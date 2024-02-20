import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

//PrimeNg
import { DockModule } from 'primeng/dock';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputMaskModule } from 'primeng/inputmask';
import { ToolbarModule } from 'primeng/toolbar';
import { CardModule } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { MenubarModule } from 'primeng/menubar';
import { FieldsetModule } from 'primeng/fieldset';
import { SpeedDialModule } from 'primeng/speeddial';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PasswordModule } from 'primeng/password';
import { MessagesModule } from 'primeng/messages';
import { CookieService } from 'ngx-cookie-service';
import { TimelineModule } from 'primeng/timeline';
import { StyleClassModule } from 'primeng/styleclass';
import { MessageService } from 'primeng/api';
import { FileUploadModule } from 'primeng/fileupload';


//Pages
import { HomeComponent } from './modules/home/home.component';
import { NavbarComponent } from './modules/navbar/navbar.component';
import { LoginComponent } from './modules/login/login.component';
import { RegisterComponent } from './modules/register/register.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,

    //PrimeNg
    InputGroupModule,
    InputGroupAddonModule,
    ButtonModule,
    InputMaskModule,
    ToolbarModule,
    CardModule,
    AvatarModule,
    AvatarGroupModule,
    DockModule,
    MenubarModule,
    FieldsetModule,
    SpeedDialModule,
    ToastModule,
    InputTextModule,
    InputTextareaModule,
    PasswordModule,
    MessagesModule,
    TimelineModule,
    StyleClassModule,
    FileUploadModule,

    //FireBase
    provideFirebaseApp(() => initializeApp({ "projectId": "vendasprodutos-d11a3", "appId": "1:154639426841:web:1bc526e2e5241fd4bb5188", "storageBucket": "vendasprodutos-d11a3.appspot.com", "apiKey": "AIzaSyANrlSJNMXeoVGCbNH8NzAvDC98DsNTpD4", "authDomain": "vendasprodutos-d11a3.firebaseapp.com", "messagingSenderId": "154639426841", "measurementId": "G-WGZST8M26H" })),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
  ],
  providers: [
    provideClientHydration(),
    MessageService,
    CookieService,
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
