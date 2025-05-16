import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DetailComponent } from './components/detail/detail.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/Home/home.component';
import { AdminComponent } from './components/admin/admin.component';
import { BookRegisterComponent } from './components/bookRegister/bookRegister.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'detail/:id', component: DetailComponent },
  // default route
  { path: '', redirectTo: '/home', pathMatch: 'full' }, 
  {path: 'home',component: HomeComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'add-book', component: BookRegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
