import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { RegisterService } from 'src/app/Services/register.service';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/Services/profile.service';
import { NgForm } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ImageServiceService } from 'src/app/Services/image-service.service';
import { fillProperties } from '@angular/core/src/util/property';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {
  userImage: string = "/assets/DefaultUser.jpg";
  uploadedImage: string="/assets/UploadImageButton.png";
  fileToUpload: File = null;
  isDefaultImage: boolean = true;
  NeedRefreshing: boolean=false;
  constructor(private service: RegisterService, private imageService: ImageServiceService,
     private profileService: ProfileService, private toastr:ToastrService) { }

     @ViewChild('fileInput')
     inputVariable: ElementRef;

  ngOnInit() {
    this.getUserClaims();
    this.getUserProfile(); 
    this.GetUserImages();
  }

  handleAvatarInput(file: FileList){
    if(file.item(0).type != "image/jpeg" &&  file.item(0).type != "image/png"){
      this.toastr.error("You can upload only .gpeg or .png type of image")
      return;
    }
    this.fileToUpload = file.item(0);
    var reader = new FileReader();
    reader.onload = (event:any)=>
    this.userImage = event.target.result;
    reader.readAsDataURL(this.fileToUpload);
    this.profileService.UpdateAvatarImage(this.fileToUpload).subscribe(()=>{
      this.toastr.success("Avatar updated")
    },()=>this.toastr.error("Something went wrong"));
  }

  handleImageInput(file: FileList){
    if(file.item(0).type != "image/jpeg" &&  file.item(0).type != "image/png"){
      this.toastr.error("You can upload only .gpeg or .png type of image")
      return;
    }
      this.isDefaultImage = false;
      this.fileToUpload = file.item(0);
      var reader = new FileReader();
      reader.onload = (event:any)=>{
        this.uploadedImage = event.target.result;
        this.inputVariable.nativeElement.value = null;
      }
        reader.readAsDataURL(this.fileToUpload);
  }

  UploadImage(caption: any){
    this.imageService.UploadImage(caption,this.fileToUpload).subscribe(()=>{
      this.toastr.success("Image uploaded");
      this.CancelLoading();
      this.GetUserImages();
    },()=>this.toastr.error("Something went wrong"));
    this.CancelLoading();    
  }

  CancelLoading(){
    this.uploadedImage ="/assets/UploadImageButton.png";
    this.isDefaultImage = true;
  }

  async getUserClaims(){
     this.service.GetUserClaims().subscribe((data:any)=>this.service.userData = data);
  }

  getUserProfile(){
    this.profileService.GetUserProfile().subscribe((data: any)=>{
      this.profileService.formData = data;
          if(data.AvatarImage!="")
      this.userImage =data.AvatarImage;
    });
  }

  ModifyProfile(form: NgForm){
    this.profileService.ModifyProfile(form.value).subscribe(()=>{
      this.toastr.success("Changes saved")
    },()=>this.toastr.error("Something went wrong"));
  }

  GetUserImages(){
    this.imageService.GetUserImages().subscribe((data:any)=>
    this.imageService.imageData = data
    );
  }

  RefreshImages(){
    this.GetUserImages();
  }

}
