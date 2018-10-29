import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  submitted = false;

  constructor(
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.authService.logout();
  }

  onSubmit(): void {
    this.submitted = true;

    this.authService.login(this.username, this.password)
      .subscribe(res => {
        console.log(res);
        this.router.navigate(['articles']);
      });
  }
}
