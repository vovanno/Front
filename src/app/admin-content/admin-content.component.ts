import { Component, OnInit } from '@angular/core';
import { Images } from '../Models/images';


@Component({
  selector: 'app-admin-content',
  templateUrl: './admin-content.component.html',
  styleUrls: ['./admin-content.component.css']
})
export class AdminContentComponent implements OnInit {

  constructor() { }

  private ShowImages:boolean = false;
  private Images: Images[];
  
  ngOnInit() {
  }




}
