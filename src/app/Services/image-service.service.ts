import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Images } from '../Models/images';

@Injectable({
  providedIn: 'root'
})
export class ImageServiceService {

  imageData: Images[];
  constructor(private http: HttpClient) { }
  
  private Url = "http://localhost:51312";

  UploadImage(caption: string, fileToUpload:File){
    const Data: FormData = new FormData();
    Data.append('Image',fileToUpload,fileToUpload.name);
    Data.append('Caption',caption);
    return this.http.post(this.Url+"/Api/Images/UploadImage",Data);
  }

  DeleteImage(image:Images){
    var httpParams = new HttpParams().set('ImageName',image.ImageName);
    let options = {"params": httpParams}
    return this.http.delete(this.Url+"/Api/Images/DeleteImage",options);
  }
  
  GetUserImages(){
    return this.http.get(this.Url+"/Api/Images/GetUserImages");
  }

}
