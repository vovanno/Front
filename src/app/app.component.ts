import { Component } from '@angular/core';
import { RegisterService } from './Services/register.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private IsAdmin: boolean = false;
  constructor(private service:RegisterService){}
  title = 'MyProject';
  ngOnInit() {
    this.isLoggedIn();
    console.log(this.service.userData.UserName)
  }

  logout(){
    localStorage.removeItem('userToken');
    this.service.userData = null;
  }

  isLoggedIn(){
    if (localStorage.getItem('userToken') == null) {
      return false;
    }
    else {
      return true;
    }
  }

 async isAdmin(){
   await this.service.GetUserClaims().subscribe((data:any)=>{
    this.service.userData = data;
   });
   if(this.service.userData.UserName =="Admin")
    this.IsAdmin = true;
 }

}
