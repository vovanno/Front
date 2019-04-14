import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Images } from 'src/app/Models/images';
import { ImageServiceService } from 'src/app/Services/image-service.service';
import { ToastrService } from 'ngx-toastr';
import { RegisterService } from 'src/app/Services/register.service';
import { AdminService } from 'src/app/Services/admin.service';
import { ThrowStmt } from '@angular/compiler';


@Component({
  selector: 'app-image-details',
  templateUrl: './image-details.component.html',
  styleUrls: ['./image-details.component.css']
})
export class ImageDetailsComponent implements OnInit {

  @Input()
  Image: Images;
  @Input()
  ShowDeleteBtn: boolean;

  @Output()
  IsHidden = new EventEmitter();
  @Output()
  NeedRefreshing = new EventEmitter();

  @ViewChild('RatedBtn')
  inputVariable: ElementRef;


  constructor(private service: ImageServiceService, private toastr: ToastrService,
    private registerService: RegisterService, private adminService: AdminService) { }

  private Rated: boolean = false;
  private Rate = [];
  ngOnInit() {
    if (this.Rate.length == 0)
      this.CreateRating();
  }

  ChooseRate() {
    this.inputVariable.nativeElement.class = "test";
  }

  CreateRating() {
    for (var i = 1; i < 6; i++) {
      this.Rate.push(i);
    }
  }

  MakeRate() {
    console.log(this.inputVariable.nativeElement.value)
    this.inputVariable.nativeElement.class = "test";
  }

  closeImageDetails() {
    this.IsHidden.emit(true);
  }

  async DeleteImage(Image: Images) {
    if (await this.IsAdmin()) {
      await this.adminService.DeleteImage(Image).subscribe(()=>{
        this.NeedRefreshing.emit(Image.UserId);
        this.toastr.success("Deleted Successfull");
      });
      
    }
    else {
      this.service.DeleteImage(Image).subscribe(() => {
        this.toastr.success("Deleted successfull");
        this.NeedRefreshing.emit(true);
        this.closeImageDetails();
      }, () => this.toastr.error("Something went wrong")
      );
    }
  }

  async IsAdmin() {
    var name;
    await this.registerService.GetUserClaims().subscribe((data: any) => {
      name = data.UserName;

    })
    if (name == 'Admin') {
      return true;
    }
    else {
      return false;
    }
  }
}



