import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Profile } from '../Models/profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
formData = new Profile();
usersList: Profile[];
  constructor(private http: HttpClient) { }
  private readonly Url = "http://localhost:51312";

  ModifyProfile(form:Profile){
    return this.http.post(this.Url+"/Api/Profile/ModifyProfile",form)
  }

  GetUserProfile(){
    return this.http.get(this.Url+"/Api/Profile/GetUserProfile");
  }

  GetUsersList(){
    return this.http.get(this.Url+"/Api/Profile/GetUsers").toPromise().then(d=>this.usersList = d as Profile[]);
  }

  UploadImage(caption: string, fileToUpload:File){
    const Data: FormData = new FormData();
    Data.append('Image',fileToUpload,fileToUpload.name);
    Data.append('Caption',caption);
    return this.http.post(this.Url+"/Api/Profile/UploadAvatar",Data);
  }
}
