import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { RegisterModel } from '../Models/register-model.model.ts';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { UserData } from '../Models/user-data';


@Injectable({
  providedIn: 'root'
})
export class RegisterService {
formData: RegisterModel;
userData = new UserData();
private readonly Url = "http://localhost:51312";
  constructor(private http: HttpClient, private toastr: ToastrService) { }


  
  Register(model: RegisterModel){
  var rHeaders = new HttpHeaders({'No-Auth':'True'});
  return this.http.post(this.Url+"/Api/Authentication/Register", model,{headers:rHeaders});
  
}

Login(UserName, Password){
  var data = "UserName="+UserName+"&Password="+Password+"&grant_type=password";
  var reqHeader = new HttpHeaders({'Content-Type':'application/x-www-urlencoded','No-Auth':'True'});
  return this.http.post(this.Url+"/Token",data,{headers:reqHeader});
}

 GetUserClaims(){
  return this.http.get(this.Url+"/api/GetUserClaims");
}

}
