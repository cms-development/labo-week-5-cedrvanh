import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isAuthenticated = false;

  constructor(
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    console.log(`Authenticated: ${this.isAuthenticated}`);
    this.isAuthenticated = (this.authService.getToken()) ? true : false;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['articles']);
  }
}
