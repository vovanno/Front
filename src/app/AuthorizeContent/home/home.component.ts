import { Component, OnInit } from '@angular/core';
import { RegisterService } from 'src/app/Services/register.service';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/Services/profile.service';
import { NgForm } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userImage: string = "/assets/DefaultUser.png";
  fileToUpload: File = null;
  constructor(private service: RegisterService, private router: Router,
     private profileService: ProfileService, private toastr:ToastrService) { }

  ngOnInit() {
    this.getUserClaims();
    this.getUserProfile(); 
  }

  handleFileInput(file: FileList){
    this.fileToUpload = file.item(0);
    var reader = new FileReader();
    reader.onload = (event:any)=>
    this.userImage = event.target.result;
    reader.readAsDataURL(this.fileToUpload);
    this.profileService.UploadImage("",this.fileToUpload).subscribe(()=>{
      this.toastr.success("Avatar updated")
    },()=>this.toastr.error("Something went wrong"));
  }

  getUserClaims(){
    this.service.GetUserClaims();
  }

  getUserProfile(){
    this.profileService.GetUserProfile().subscribe((data: any)=>{
      this.profileService.formData = data;
          if(data.AvatarImage!="")
      this.userImage = data.AvatarImage;
    });
  }

  onSubmit(form: NgForm){
    this.profileService.ModifyProfile(form.value).subscribe(()=>{
      this.toastr.success("Changes saved")
    },()=>this.toastr.error("Something went wrong"));
  }

  ModifyProfile(form: NgForm){
    this.profileService.ModifyProfile(form.value).subscribe(()=>{
      this.toastr.success("Changes saved")
    },()=>this.toastr.error("Something went wrong"));
  }

  Logout(){
    localStorage.removeItem('userToken');
    this.profileService.formData = null;
    this.router.navigate(['Login']);
  }

}
