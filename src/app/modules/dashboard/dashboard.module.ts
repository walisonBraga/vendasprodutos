import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatRadioModule } from '@angular/material/radio';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';


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
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DropdownModule } from 'primeng/dropdown';
import { MatSelectModule } from '@angular/material/select';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { PaginatorModule } from 'primeng/paginator';
import { ChartModule } from 'primeng/chart';
import { DataViewModule } from 'primeng/dataview';
import { DividerModule } from 'primeng/divider';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';
import { CheckboxModule } from 'primeng/checkbox';


//Pages
import { DashboardHomeComponent } from './page/dashboard-home/dashboard-home.component';
import { TolbarNavigationComponent } from './page/tolbar-navigation/tolbar-navigation.component';
import { DASHBOARD_ROUTES } from './dashboard.routing';
import { AddProductsComponent } from './page/add-products/add-products.component';
import { ProfileComponent } from './settings/profile/profile.component';
import { StockComponent } from './page/stock/stock.component';


@NgModule({
  declarations: [
    DashboardHomeComponent,
    TolbarNavigationComponent,
    AddProductsComponent,
    ProfileComponent,
    StockComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    //Angular
    MatRadioModule,
    MatChipsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDialogModule,

    //PrimeNg
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
    TableModule,
    DialogModule,
    TagModule,
    RadioButtonModule,
    DropdownModule,
    ProgressSpinnerModule,
    PaginatorModule,
    ChartModule,
    DataViewModule,
    DividerModule,
    TriStateCheckboxModule,
    CheckboxModule,
    RouterModule.forChild(DASHBOARD_ROUTES)
  ],
  providers: [
    MessageService,
    CookieService,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DashboardModule { }
