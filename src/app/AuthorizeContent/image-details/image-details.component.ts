import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Images } from 'src/app/Models/images';
import { ImageServiceService } from 'src/app/Services/image-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-image-details',
  templateUrl: './image-details.component.html',
  styleUrls: ['./image-details.component.css']
})
export class ImageDetailsComponent implements OnInit {

  @Input()
  Image:Images;
  @Input()
  ShowDeleteBtn:boolean;
  
  @Output()
  IsHidden = new EventEmitter();
  @Output()
  NeedRefreshing = new EventEmitter();


  constructor(private service: ImageServiceService, private toastr: ToastrService) { }

  ngOnInit() {
  }

  closeImageDetails(){
    this.IsHidden.emit(true);
  }

  DeleteImage(Image:Images){
    this.service.DeleteImage(Image).subscribe(()=>{
    this.toastr.success("Deleted successfull");
    this.NeedRefreshing.emit(true);
    this.closeImageDetails();
  },()=>this.toastr.error("Something went wrong")
  );}
}
