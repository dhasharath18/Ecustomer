import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'item-list',
    pathMatch: 'full'
  },
 
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },

  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'for-pass',
    loadChildren: () => import('./pages/for-pass/for-pass.module').then( m => m.ForPassPageModule)
  },
  {
    path: 'change-pass',
    loadChildren: () => import('./pages/change-pass/change-pass.module').then( m => m.ChangePassPageModule)
  },
 
  {
    path: 'item-list',
    loadChildren: () => import('./pages/item-list/item-list.module').then( m => m.ItemListPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./pages/settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'item-details',
    loadChildren: () => import('./pages/item-details/item-details.module').then( m => m.ItemDetailsPageModule)
  },
  {
    path: 'logout',
    loadChildren: () => import('./pages/logout/logout.module').then( m => m.LogoutPageModule)
  },
  {
    path: 'cart',
    loadChildren: () => import('./pages/cart/cart.module').then( m => m.CartPageModule)
  },
  {
    path: 'checkout',
    loadChildren: () => import('./pages/checkout/checkout.module').then( m => m.CheckoutPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'my-orders',
    loadChildren: () => import('./pages/my-orders/my-orders.module').then( m => m.MyOrdersPageModule)
  },
  {
    path: 'edit-profile',
    loadChildren: () => import('./pages/edit-profile/edit-profile.module').then( m => m.EditProfilePageModule)
  },
  {
    path: 'edit-address',
    loadChildren: () => import('./pages/edit-address/edit-address.module').then( m => m.EditAddressPageModule)
  },
  {
    path: 'addaddress',
    loadChildren: () => import('./modals/addaddress/addaddress.module').then( m => m.AddaddressPageModule)
  },
  
 
  {
    path: 'order-details',
    loadChildren: () => import('./modals/order-details/order-details.module').then( m => m.OrderDetailsPageModule)
  },
  {
    path: 'ordersummary',
    loadChildren: () => import('./pages/ordersummary/ordersummary.module').then( m => m.OrdersummaryPageModule)
  },
 
  {
    path: 'address-list',
    loadChildren: () => import('./pages/address-list/address-list.module').then( m => m.AddressListPageModule)
  },
  
 ];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
