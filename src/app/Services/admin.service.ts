import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Images } from '../Models/images';
import { ThrowStmt } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  private readonly Url = "http://localhost:51312";

  DeleteUser(id: string){
    var httpParams = new HttpParams().set('UserId',id);
    let options = {"params": httpParams}
    return this.http.delete(this.Url+"/Api/Admin/DeleteUser",options);
  }

  DeleteImage(image: Images){
    var httpParams = new HttpParams().set('ImageName',image.ImageName);
    let options = {"params": httpParams}
    return this.http.delete(this.Url+"/Api/Admin/DeleteImage",options);
  }
}
