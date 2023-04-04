import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AboutComponent } from "./pages/about/about.component";
import { ProductComponent } from './pages/product/product.component';
import { ProductsComponent } from './pages/products/products.component';

export const routes: Routes = [
  {
    path: 'products',
    component: ProductsComponent
  },
  {
    path: 'about',
    component: AboutComponent
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
