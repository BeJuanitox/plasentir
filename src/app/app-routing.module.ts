import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProductsComponent } from './pages/products/products.component';
import { ProductComponent } from './pages/product/product.component';

export const routes: Routes = [
  {
    path: 'products',
    component: ProductsComponent
  },
  {
    path: 'product/:id',
    component: ProductComponent
  },
  {
    path: '**',
    redirectTo: 'products',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
