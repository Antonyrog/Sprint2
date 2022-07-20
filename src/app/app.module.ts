import { NgModule } from '@angular/core';
import {MatPaginatorModule} from '@angular/material/paginator'; //paguinador 
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BnNgIdleService } from 'bn-ng-idle'; // import bn-ng-idle service
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './guards/auth.guard';
import { TokenInterceptorService } from './interceptor/token-interceptor.service';
import { ProfileComponent } from './components/profile/profile.component';
import { UsersComponent } from './components/users/users.component';
import { FromUsersComponent } from './components/users/fromregister/from-users/from-users.component';
import { FormEditComponent } from './components/users/form-edit.component';
import { RolesComponent } from './components/roles/roles/roles.component';
import { FromRolesComponent } from './components/roles/fromregister/from-roles/from-roles.component';
import { FromEditComponent } from './components/roles/fromregister/from-edit/from-edit.component';
import { PermissionsComponent } from './components/permissions/permissions/permissions.component';
import { ArticulosComponent } from './components/articulos/articulos/articulos.component';
import { AddProductComponent } from './components/articulos/fromregister/add-product/add-product.component';
import { EditProductsComponent } from './components/articulos/fromregister/editProducts/edit-products/edit-products.component';


/* Rutas */
const routes:Routes = [
  { path: '', component:HomeComponent, canActivate: [AuthGuard]},
  { path: 'register', component:RegisterComponent },
  { path: 'login', component:LoginComponent },
  { path: 'profile', component:ProfileComponent, canActivate: [AuthGuard] },
  { path: 'users', component:UsersComponent, canActivate: [AuthGuard] },
  { path: 'users/fromUser', component:FromUsersComponent, canActivate: [AuthGuard] },
  { path: 'users/fromEdit/:id', component:FormEditComponent, canActivate: [AuthGuard] },
  { path: 'roles', component:RolesComponent, canActivate: [AuthGuard] },
  { path: 'roles/fromRole', component:FromRolesComponent, canActivate: [AuthGuard] },
  { path: 'roles/fromRole/:id', component:FromEditComponent, canActivate: [AuthGuard] },
  { path: 'permissions', component:PermissionsComponent, canActivate: [AuthGuard] },
  { path: 'products', component:ArticulosComponent, canActivate: [AuthGuard] },
  { path: 'products/Addproducts', component:AddProductComponent, canActivate: [AuthGuard] },
  { path: 'products/editProducts/:id', component:EditProductsComponent, canActivate: [AuthGuard] },
  
];
 
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    UsersComponent,
    FromUsersComponent,
    FormEditComponent,
    RolesComponent,
    FromRolesComponent,
    FromEditComponent,
    PermissionsComponent,
    ArticulosComponent,
    AddProductComponent,
    EditProductsComponent,

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(), // ToastrModule added
    MatPaginatorModule, //paguinador
  ],

  /* interectpr multiple */
  providers: [{provide:HTTP_INTERCEPTORS,useClass:TokenInterceptorService,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
