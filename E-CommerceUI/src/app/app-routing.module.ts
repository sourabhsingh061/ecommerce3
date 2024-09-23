import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component'; 
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductsComponent } from './products/products.component';
import { OrdersComponent } from './orders/orders.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { ShoopingCartComponent } from './shooping-cart/shooping-cart.component';
import { ProductlistComponent } from './productlist/productlist.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },

  { path: 'products', component: ProductsComponent },
  { path: 'productlist', component: ProductlistComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'wishlist', component: WishlistComponent },
  { path: 'shopping-cart', component: ShoopingCartComponent },

  { path: 'dashboard', component: DashboardComponent },
  { path: 'shopping-cart/:productId', component: ShoopingCartComponent }
  // Add other routes here if needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
