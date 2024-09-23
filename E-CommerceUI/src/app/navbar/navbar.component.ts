import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  form: any = {
    name: ' ',
    data: {}
  }
  isLogin() {
    let check = localStorage.getItem('name');
    if (check && check != 'null' && check.trim() !== '') {
      console.log("inside isLogin function")
      this.form.data.name = check;
      return true;

    } else {
      return false;
    }
  }

}
