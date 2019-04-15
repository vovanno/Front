import { Component, OnInit } from '@angular/core';
import { RegisterService } from 'src/app/Services/register.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrModule, ToastrService } from "ngx-toastr";
import { NgForm } from '@angular/forms';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private service: RegisterService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
  }
  
  onSubmit(userName, Password){
    this.service.Login(userName, Password).subscribe((data: any)=>{
      localStorage.setItem("userToken",data.access_token);
      this.router.navigate(["Profile"]);
      this.toastr.success("Welcome");
    },
    (err: HttpErrorResponse)=>{
      this.toastr.error("Wrong Email or Password");
    });
  }

}
