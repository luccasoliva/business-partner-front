import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  currentRoute!: string;

  CARD_PATH: string = '/card';
  LOGIN_PATH: string = '/auth/login';


  constructor(private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService) {}

  ngOnInit() {
    this.currentRoute = this.route.snapshot.url[0] ? this.route.snapshot.url[0].path : '';
  }

  redirectUser() {
    const destination = this.authService.logged() ? this.CARD_PATH : this.LOGIN_PATH;
    this.router.navigate([destination]);
  }
}
