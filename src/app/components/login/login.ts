import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { loaderService } from '../../Services/loader';
import { MatDialog } from '@angular/material/dialog';
import { Popup } from '../popup/popup';
import { Rest } from '../../Services/rest';
import { Apiendpoints } from '../../constants/endPoints';

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
  // hide = true;


  loginForm!: FormGroup
  response: any;
  constructor(private fb: FormBuilder, private router: Router, private loader: loaderService, private dialog: MatDialog, private rest: Rest) { }
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    localStorage.removeItem('Token')
  }

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loader.show();

    const payload = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value
    };
    this.rest.post(Apiendpoints.login, payload).subscribe({
      next: (res: any) => {
        if (res.rcode == 200) {
          // setTimeout(() => {
            this.response = res;

            const dialogRef = this.dialog.open(Popup, {
              width: '300px',
              data: { isTrue: 'true', title: 'Success', message: 'Login Successful!' }
            });

            dialogRef.afterClosed().subscribe(() => {
              localStorage.setItem('Token', res.token);
              this.router.navigate(['/home']);
            });
            this.loader.hide();
          // }, 2000);
        }else{
          this.loader.hide();
          console.log("NO Response");
          
        }




        // Assuming backend returns { token: "xxxxxx" }



      },

      error: (err: any) => {
        this.loader.hide();

        const dialogRef = this.dialog.open(Popup, {
          width: '300px',
          data: { isTrue: 'false', title: 'Error', message: 'Invalid Email or Password' }
        });

        dialogRef.afterClosed().subscribe(() => {
          this.router.navigate(['/login']);
        });
      }
    });
  }


}
