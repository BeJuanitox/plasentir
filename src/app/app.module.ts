import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { WhatsappButtonComponent } from './components/whatsapp-button/whatsapp-button.component';
import { ProductsComponent } from './pages/products/products.component';

import { NgMaterialModule } from './ng-material/ng-material.module';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { ShoppingCartModalComponent } from './components/shopping-cart-modal/shopping-cart-modal.component';
import { TopSellersComponent } from './components/top-sellers/top-sellers.component';
import { PaginatePipe } from './pipes/paginate.pipe';
import { AboutComponent } from './pages/about/about.component';
import { ProductComponent } from './pages/product/product.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    ProductCardComponent,
    ProductsComponent,
    SearchBarComponent,
    ShoppingCartModalComponent,
    WhatsappButtonComponent,
    TopSellersComponent,
    PaginatePipe,
    AboutComponent,
    ProductComponent,
    PrivacyPolicyComponent
  ],
  imports: [
    HttpClientModule,
    NgMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
