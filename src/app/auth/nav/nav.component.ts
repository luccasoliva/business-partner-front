import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "src/app/auth/auth.service";


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  currentRoute!: string;
  isLoggedIn: boolean = false;
  constructor(private route: ActivatedRoute,
              private authService: AuthService,
              private router: Router) {}

  ngOnInit() {
    this.currentRoute = this.route.snapshot.url[0] ? this.route.snapshot.url[0].path : '';

    this.isUserLoggedIn();

  }

  isUserLoggedIn() {
    this.isLoggedIn = this.authService.logged();
    return this.isLoggedIn;
  }

  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }


}
