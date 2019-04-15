import { Component, OnInit, Input } from '@angular/core';
import { ProfileService } from 'src/app/Services/profile.service';
import { Images } from 'src/app/Models/images';
import { AdminService } from 'src/app/Services/admin.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  @Input()
  ShowDeleteBtn: boolean = false;
  @Input()
  ShowDeleteUserBtn: boolean = false;

  private Images: Images[];
  private ShowImages: boolean = false;
  private ShowPopupDialog: boolean = false;
  private tempUserId: string;
  constructor(private service: ProfileService, private adminService: AdminService, private toastr: ToastrService) { }

  UserLogo: string = "../../../assets/DefaultUser.png";
  ngOnInit() {
    this.GetUsers();
  }

  GetUsers() {
    this.service.GetUsersList().subscribe((data: any) => {
      this.service.usersList = data;
    });
  }

  async ShowUserImages(id: string) {
    await this.service.GetUserImages(id).subscribe((data: any) => {
      this.Images = data,
        this.ShowImages = true;
    });
  }

  DeleteUser(id: string) {
    this.tempUserId = id;
    this.ShowPopupDialog = true;
  }

  RefreshImages(event: string) {
    this.ShowUserImages(event);
  }

  CancelDeleting() {
    this.ShowPopupDialog = false;
  }

  ConfirmDeleting() {
    this.ShowPopupDialog = false;
    this.adminService.DeleteUser(this.tempUserId).subscribe(() =>{
       this.toastr.success("User deleted Successfull");
       this.GetUsers();
       this.ShowImages = false;
    });
    this.tempUserId = "";
    
  }

}
