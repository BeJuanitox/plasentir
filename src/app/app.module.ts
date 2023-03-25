import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductsComponent } from './pages/products/products.component';

import { NgMaterialModule } from './ng-material/ng-material.module';
import { ShoppingCartModalComponent } from './components/shopping-cart-modal/shopping-cart-modal.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductCardComponent,
    FooterComponent,
    ProductsComponent,
    ShoppingCartModalComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgMaterialModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
