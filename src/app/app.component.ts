import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MyProject';
  isLoggedin: boolean = false;
  ngOnInit() {
    this.isLoggedIn();
  }


  isLoggedIn(){
    if (localStorage.getItem('userToken') == null) {
      this.isLoggedin = false;
      return this.isLoggedin;
    }
    else {
      return true;
    }
  }
}
