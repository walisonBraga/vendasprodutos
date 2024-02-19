import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


//PrimeNg
import { SidebarModule } from 'primeng/sidebar';
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
import { CarouselModule } from 'primeng/carousel';
import { InputNumberModule } from 'primeng/inputnumber';
import { ImageModule } from 'primeng/image';
import { FileUploadModule } from 'primeng/fileupload';


//Pages
import { DashboardHomeComponent } from './page/dashboard-home/dashboard-home.component';
import { TolbarNavigationComponent } from './page/tolbar-navigation/tolbar-navigation.component';
import { DASHBOARD_ROUTES } from './dashboard.routing';
import { AddProductsComponent } from './page/add-products/add-products.component';


@NgModule({
  declarations: [
    DashboardHomeComponent,
    TolbarNavigationComponent,
    AddProductsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    SidebarModule,
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
    CarouselModule,
    InputNumberModule,
    ImageModule,
    FileUploadModule,
    RouterModule.forChild(DASHBOARD_ROUTES)
  ],
  providers: [
    MessageService,
    CookieService,
  ],
})
export class DashboardModule { }
