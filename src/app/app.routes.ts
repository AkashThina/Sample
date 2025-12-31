import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Signup } from './components/signup/signup';
import { Resetpassword } from './components/resetpassword/resetpassword';
import { Home } from './modules/Dashboard/home/home';
import { VideoCall } from './components/video-call/video-call';
// import { Login } from './components/login/login';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'login' },
    { path: 'login', component: Login },
    { path: 'signup', component: Signup },
    { path: 'resetPassword', component: Resetpassword },
    { path: 'home', component: Home },
    { path: 'video-call', component: VideoCall },
];
