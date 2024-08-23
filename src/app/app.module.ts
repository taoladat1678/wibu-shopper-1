import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { CategoryListComponent } from './component/category-list/category-list.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoryAddComponent } from './component/category-add/category-add.component';
import { CategoryEditComponent } from './component/category-edit/category-edit.component';
import { ProductListComponent } from './component/product-list/product-list.component';
import { ProductAddComponent } from './component/product-add/product-add.component';
import { ProductEditComponent } from './component/product-edit/product-edit.component';
import { ProductDetailComponent } from './component/product-detail/product-detail.component';
import { RegisterComponent } from './component/register/register.component';
import { AuthGuard } from './auth/auth-guard-service';
import { AdminGuard } from './auth/admin-guard';
import { WarningComponent } from './component/warning/warning.component';








const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'category-add', component: CategoryAddComponent },
  { path: 'category-edit/:id', component: CategoryEditComponent },
  { path: 'category-list', component: CategoryListComponent, canActivate: [AdminGuard]},
  { path: 'product-list', component: ProductListComponent, canActivate: [AdminGuard] },
  { path: 'product-add', component: ProductAddComponent },
  { path: 'product-edit/:id', component: ProductEditComponent },
  { path: 'product-detail/:id', component: ProductDetailComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'warning', component: WarningComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    CategoryListComponent,
    CategoryAddComponent,
    CategoryEditComponent,
    ProductListComponent,
    ProductAddComponent,
    ProductEditComponent,
    ProductDetailComponent,
    RegisterComponent,
    WarningComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
