import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './Authentication/register/register.component';
import { LoginComponent } from './Authentication/login/login.component';
import { HomeComponent } from './AuthorizeContent/home/home.component';
import { AuthGuard } from './Auth/auth.guard';
import { UsersListComponent } from './AuthorizeContent/UsersList/users-list/users-list.component';
import { GalleryComponent } from './AuthorizeContent/gallery/gallery.component';
import { AdminContentComponent } from './admin-content/admin-content.component';

const routes: Routes = [
  {path:'Register', component: RegisterComponent},
  {path:'Login', component: LoginComponent},
  {path:'Profile', component: HomeComponent, canActivate: [AuthGuard]},
  {path:'Users', component: UsersListComponent, canActivate: [AuthGuard]},
  {path:'Gallery', component: GalleryComponent},
  {path:'AdminPanel', component: AdminContentComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
