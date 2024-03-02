import { Routes, RouterModule } from '@angular/router';
import { DashboardHomeComponent } from './page/dashboard-home/dashboard-home.component';
import { TolbarNavigationComponent } from './page/tolbar-navigation/tolbar-navigation.component';
import { AddProductsComponent } from './page/add-products/add-products.component';
import { ProfileComponent } from './settings/profile/profile.component';
import { StockComponent } from './page/stock/stock.component';
import { AuthGuardService } from '../../service/AuthGuard.service';
import { UpdateProductComponent } from './page/add-products/update-product/update-product.component';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    component: DashboardHomeComponent,
    // canActivate: [AuthGuardService]
  },
  {
    path: 'tolbar',
    component: TolbarNavigationComponent,
    // canActivate: [AuthGuardService]
  },
  {
    path: 'addProduct',
    component: AddProductsComponent,
    // canActivate: [AuthGuardService]
  },
  {
    path: 'update-product/:id',
    component: UpdateProductComponent
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
