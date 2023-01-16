import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  currentRoute!: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.currentRoute = this.route.snapshot.url[0].path;
  }
}
