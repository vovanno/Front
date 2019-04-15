import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Images } from '../Models/images';

@Injectable({
  providedIn: 'root'
})
export class ImageServiceService {

  imageData: Images[];
  constructor(private http: HttpClient) { }
  
  private Url = "http://localhost:51312";
  private reqHeader = new HttpHeaders({'No-Auth':'True'});

  UploadImage(caption: string, fileToUpload:File){
    const Data: FormData = new FormData();
    Data.append('Image',fileToUpload,fileToUpload.name);
    Data.append('Caption',caption);
    return this.http.post(this.Url+"/Images/",Data);
  }

  DeleteImage(image:Images){
    var httpParams = new HttpParams().set('ImageName',image.ImageName);
    let options = {"params": httpParams}
    return this.http.delete(this.Url+"/Images/"+ image.UserId,options);
  }
  
  // GetUserImages(){
  //   return this.http.get(this.Url+"/Images/GetUserImages");
  // }

  GetAllImages(page:number = 1){
    return this.http.get(this.Url+"/Images/"+page,{headers:this.reqHeader})
  }

  GetPages(){
    return this.http.get(this.Url+"/Images/GetPages",{headers:this.reqHeader}) 
  }

  SearchImages(Caption:string){
    return this.http.get(this.Url+"/Images/Search/"+Caption,{headers:this.reqHeader});
  }

}
