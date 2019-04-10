import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Images } from 'src/app/Models/images';

@Component({
  selector: 'app-user-image',
  templateUrl: './user-image.component.html',
  styleUrls: ['./user-image.component.css']
})

export class UserImageComponent implements OnInit {

  @Input()
  Image:Images;

  @Input()
  ShowDeleteBtn:boolean;
  
  @Output()
  Refresh = new EventEmitter();

  IsHidden: boolean = true;
  constructor() { }

  ngOnInit() {
  }

  ShowImageDetails(){
    this.IsHidden = false;
  }

  HideImageDetails(event:boolean){
    this.IsHidden = event;
  }

  RefreshImages(event: boolean){
    this.Refresh.emit(true);
  }

}
