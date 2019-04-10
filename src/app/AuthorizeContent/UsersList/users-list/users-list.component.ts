import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/Services/profile.service';
import { Images } from 'src/app/Models/images';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  private Images: Images[];
  private ShowImages: boolean = false;
  constructor(private service: ProfileService) { }

  UserLogo: string = "../../../assets/DefaultUser.png";
  ngOnInit() {
    this.service.GetUsersList().subscribe((data:any)=>{
    this.service.usersList = data;
    });
  }


  ShowUserImages(id:string){
    this.service.GetUserImages(id).subscribe((data:any)=>{
    this.Images = data,
    this.ShowImages= true;
  });
  }

}
