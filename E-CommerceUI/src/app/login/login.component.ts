import { Component, OnInit } from '@angular/core';
import { AuthInterceptorService } from '../services/auth-interceptor.service';
import { HttpServiceService } from '../services/http-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  endpoint = "http://localhost:8080/Auth";

  form = {
    error: false,
    loginId: '',
    password: ''
  };

  inputerror: { [key: string]: string } = {}; // Define inputerror with appropriate typing
  message = '';

  constructor(private authService: AuthInterceptorService, private httpService: HttpServiceService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {}

  onLogin() {
    var _self = this;
    this.httpService.post(this.endpoint + "/login", this.form, function (res: any) {
      _self.inputerror = {}; // Reset inputerror before setting new errors
      if (res.result && res.result.inputerror) {
        _self.inputerror = res.result.inputerror; // Assign errors from the backend to inputerror
      }
      if (res.success && res.result != null) {
        localStorage.setItem('name',res.result.name)
        localStorage.setItem('token','Bearer '+res.result.token)
        localStorage.setItem('userId', res.result.id)
        // Handle successful loginng s 
        _self.router.navigate(['/productlist']); // Example: navigate to home page
      } else {
        _self.message = 'Login failed. Please check your credentials.'; // Handle login failure
      }
    });
  }
}
