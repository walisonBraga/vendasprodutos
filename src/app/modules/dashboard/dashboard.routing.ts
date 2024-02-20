
import { Routes, RouterModule } from '@angular/router';
import { DashboardHomeComponent } from './page/dashboard-home/dashboard-home.component';
import { TolbarNavigationComponent } from './page/tolbar-navigation/tolbar-navigation.component';
import { AddProductsComponent } from './page/add-products/add-products.component';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    component: DashboardHomeComponent
  },
  {
    path: 'tolbar',
    component: TolbarNavigationComponent
  },
  {
    path: 'addProduct',
    component: AddProductsComponent
  }
];

// export const DashboardRoutes = RouterModule.forChild(routes);
