import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/Services/profile.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  constructor(private service: ProfileService) { }

  UserLogo: string = "../../../assets/DefaultUser.png";
  ngOnInit() {
    this.service.GetUsersList().subscribe((data:any)=>{
    this.service.usersList = data;
    });
    
  }

}
