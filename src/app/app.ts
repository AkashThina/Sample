import { Component, OnInit, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Loader } from './components/loader/loader';
import { NavBar } from './modules/Dashboard/nav-bar/nav-bar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Loader, NavBar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('Sample');
  isUserLoggedIn: boolean = false

  constructor(private router : Router){}
  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const token = localStorage.getItem('Token')
        // this.showAPIDoc = !!token;
         this.checkUserLoggedin()
      }
    });
   
  }
  checkUserLoggedin(): boolean {
    let token: any = localStorage.getItem('Token');
    if (token) {
      this.isUserLoggedIn = true;
      return true;
    } else {
      this.isUserLoggedIn = false;
      return false;
    }
  }
}
