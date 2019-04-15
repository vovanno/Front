import { Component, OnInit } from '@angular/core';
import { RegisterService } from 'src/app/Services/register.service';
import { NgForm } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private service: RegisterService, private toastr:ToastrService,
    private router: Router) { }

  ngOnInit() {
   this.ResetForm();
  }
  ResetForm(form?: NgForm){
    if(form!=null)
      form.resetForm();
      this.service.formData = {
        Email:"",
        Password:"",
        ConfirmPassword:"",
        UserName: ""
      }
    }

    onSubmit(form: NgForm){
       this.service.Register(form.value).subscribe(()=>{
        this.toastr.success("Successfull registration"),
        this.ResetForm();
        this.router.navigate(["Login"]);      
       },
      (message:any)=>{
        if(message.error.ExceptionMessage!=null){
          this.toastr.error(message.error.ExceptionMessage);
        }
        // console.log(message.error.ModelState.ExceptionMessage[0]);
        else {
          this.toastr.error(message.error.ModelState.ExceptionMessage[0]);
        }
      })
    }

}
