import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = this.fb.group({
    email: ['', [ Validators.required ]],
    password: ['', [ Validators.required ]],
  })

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackbar: MatSnackBar) { }

  ngOnInit() {
  }

  //login method
  async login() {
     const credentials = this.loginForm.value;
    this.authService.login(credentials).subscribe({
      next: () => this.router.navigateByUrl('/card'),
      error: err => this.snackbar.open(err.error.message, 'Close', { duration: 3000 }),
      complete: () => console.log('completed')
    });
  }


}
