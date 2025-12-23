import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { loaderService } from '../../Services/loader';
import { Popup } from '../popup/popup';
import { MatDialog } from '@angular/material/dialog';
import { Rest } from '../../Services/rest';
import { Apiendpoints } from '../../constants/endPoints';

@Component({
  selector: 'app-signup',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    RouterLink
  ],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup implements OnInit {
  signupForm!: FormGroup;
  hidePassword = true;
  hideConfirmPassword = true;
  isPasswordMatched = false


  constructor(private rest : Rest,private fb: FormBuilder, private loader: loaderService, private router: Router, private dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });

    this.signupForm.get('confirmPassword')?.valueChanges.subscribe((value) => {
      this.isPasswordMatched = false
    })
  }


  // passwordMatchValidator(form: FormGroup): boolean {
  //   const password = form.get('password')?.value;
  //   const confirmPassword = form.get('confirmPassword')?.value;
  //   return password === confirmPassword;
  // }

  // get isPasswordMatched(): boolean {
  //   return this.passwordMatchValidator(this.signupForm);
  // }


  onSubmit() {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }

    this.loader.show();

    const payload = this.signupForm.value;

    this.rest.post(Apiendpoints.signup, payload).subscribe({
      next: (res: any) => {
        setTimeout(() => {
          this.loader.hide();
          const dialogRef = this.dialog.open(Popup, {
            width: '300px',
            data: { isTrue: 'true', title: 'Success', message: 'Signup successful!' }
          });

          dialogRef.afterClosed().subscribe(() => {
            this.router.navigate(['/login']);
          });
        }, 2000);
      },

      error: () => {
        this.loader.hide();
        const dialogRef = this.dialog.open(Popup, {
          width: '300px',
          data: { isTrue: 'false', title: 'Error', message: 'Signup failed! User may already exist.' }
        });
      }
    });
  }

}
