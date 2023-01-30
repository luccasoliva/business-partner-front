import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../auth.service';
import { User } from '../interfaces/User';
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  submitted: boolean = false;

  registerForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private snackbar: MatSnackBar,
              private router: Router) { }

  ngOnInit() {
  }

  registerUser(){
    const userFormValue: User = this.registerForm.value;
    this.authService.registerUser(userFormValue).subscribe({
      next: () => { this.router.navigate(['/auth/login']); },
      error: (error) => {
        this.snackbar.open(error.error.message, 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['error-snackbar']
        });
       }
    });
  }

}
