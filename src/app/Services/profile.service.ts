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

  ModifyProfile(profile: Profile,id:string) {
    return this.http.put(this.Url + "/Profile/"+id, profile)
  }

  GetUserProfile(id:string) {
    return this.http.get(this.Url + "/Profile/"+ id);
  }

  GetUsersList() {
    return this.http.get(this.Url + "/Users");
  }

  UpdateAvatarImage(fileToUpload: File, id: string) {
    const Data: FormData = new FormData();
    Data.append('Image', fileToUpload, fileToUpload.name);
    return this.http.put(this.Url + "/Profile/" + id + "/Avatar", Data);
  }

  GetUserImages(id: string) {
    return this.http.get(this.Url + "/Profile/" + id + "/Images");
  }

}
