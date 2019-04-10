import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Profile } from '../Models/profile';
import { Images } from '../Models/images';

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
    return this.http.get(this.Url+"/Api/Profile/GetUsers");
  }

  UpdateAvatarImage(fileToUpload:File){
    const Data: FormData = new FormData();
    Data.append('Image',fileToUpload,fileToUpload.name);
    return this.http.post(this.Url+"/Api/Profile/UploadAvatar",Data);
  }

  GetUserImages(id:string){
    return this.http.get(this.Url+"/Api/Profile/"+ id+ "/Images");
  }

}
