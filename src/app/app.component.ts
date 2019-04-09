import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MyProject';
  ngOnInit() {
    this.isLoggedIn();
  }

  logout(){
    localStorage.removeItem('userToken');
  }

  isLoggedIn(){
    if (localStorage.getItem('userToken') == null) {
      return false;
    }
    else {
      return true;
    }
  }
}
