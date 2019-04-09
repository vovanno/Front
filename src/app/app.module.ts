import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Authentication/login/login.component';
import { RegisterComponent } from './Authentication/register/register.component';
import { RegisterService } from './Services/register.service';
import { HomeComponent } from './AuthorizeContent/home/home.component';
import { ToastrModule } from "ngx-toastr";
import { AuthGuard } from './Auth/auth.guard';
import { AuthInterceptor } from './Auth/auth.interceptor';
import { ProfileService } from './Services/profile.service';
import { UsersListComponent } from './AuthorizeContent/UsersList/users-list/users-list.component';
import { ConfirmEqualValidatorDirective } from './Shared/confirm-equal-validator.directive';
import { GalleryComponent } from './AuthorizeContent/gallery/gallery.component';
import { UserImageComponent } from './AuthorizeContent/user-image/user-image.component';
import { ImageDetailsComponent } from './AuthorizeContent/image-details/image-details.component';
import { ImageServiceService } from './Services/image-service.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    UsersListComponent,
    ConfirmEqualValidatorDirective,
    GalleryComponent,
    UserImageComponent,
    ImageDetailsComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
  ],
  providers: [
    RegisterService,
    HttpClientModule,
    ProfileService,
    AuthGuard,
    ImageServiceService,
    {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
