import { Routes, RouterModule } from '@angular/router';
import { DashboardHomeComponent } from './page/dashboard-home/dashboard-home.component';
import { TolbarNavigationComponent } from './page/tolbar-navigation/tolbar-navigation.component';
import { AddProductsComponent } from './page/add-products/add-products.component';
import { ProfileComponent } from './settings/profile/profile.component';
import { StockComponent } from './page/stock/stock.component';
import { AuthGuardService } from '../../service/AuthGuard.service';
import { DashboardGuardService } from '../../service/AuthGuard/dashboard-guard.service';
import { AddProductGuardService } from '../../service/AuthGuard/add-product-guard.service';


export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    component: DashboardHomeComponent,
    canActivate: [DashboardGuardService]
  },
  {
    path: 'tolbar',
    component: TolbarNavigationComponent,
    // canActivate: [AuthGuardService]
  },
  {
    path: 'addProduct',
    component: AddProductsComponent,
    canActivate: [AddProductGuardService]
  },
  {
    path: 'perfil',
    component: ProfileComponent,
    // canActivate: [AuthGuardService]
  },
  {
    path: 'stocks',
    component: StockComponent,
    // canActivate: [AuthGuardService]
  }

];

export const DashboardRoutes = RouterModule.forChild(DASHBOARD_ROUTES);
