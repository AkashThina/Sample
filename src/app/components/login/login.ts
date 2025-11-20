import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    RouterLink
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login implements OnInit {
  hide = true;

  
loginForm!:FormGroup
  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
   this. loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });
  }

  onSubmit() {
    console.log(this.loginForm.value);
  }
}
