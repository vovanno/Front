import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ImageServiceService } from 'src/app/Services/image-service.service';
import { containsElement } from '@angular/animations/browser/src/render/shared';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  constructor(private service: ImageServiceService) { }
  private TotalPages: number;
  private Enumeration = [];
  private Message:string="";
  private HidePaging:boolean=false;

  @ViewChild('SearchingInput')
  inputVariable: ElementRef;

  ngOnInit() {
    if(this.Enumeration.length==0){
      this.GetPages();
    }
    this.GetAllImages();
  }

  GetAllImages(){
    this.service.GetAllImages().subscribe((data:any)=>{
      this.service.imageData = data;
      this.GeneratePages();
      });
  }  

  GeneratePages(){
    for(var i=1;i<=this.TotalPages;i++){
      this.Enumeration.push(i);
    }
  }

  ChangePage(page: any){
    this.service.GetAllImages(page).subscribe((data:any)=>{
      this.service.imageData = data;})
  }   

  GetPages(){
    this.service.GetPages().subscribe((data:any)=>this.TotalPages = data);    
  }

  Clear(){
    this.Message="";
    this.HidePaging = false;
    this.inputVariable.nativeElement.value = "";
    this.GetAllImages();
  }

  SearchImages(Caption: string){
    this.Message="";
    if(Caption==""){
      this.Message="No matches";
      this.service.imageData=null;
      this.HidePaging = true;
      this.Enumeration = [];  
      return;
    }
    this.HidePaging = true;
    this.Enumeration = [];
    this.service.SearchImages(Caption).subscribe((data:any)=>{
      if(data.length>0){
        this.service.imageData = data;
      }
      else{
        this.Message="No matches";
        this.service.imageData=null;
      }
    })
  }
}
