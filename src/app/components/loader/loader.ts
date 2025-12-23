import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { loaderService } from '../../Services/loader';

@Component({
  selector: 'app-loader',
  imports: [CommonModule],
  templateUrl: './loader.html',
  styleUrl: './loader.css',
})
export class Loader {
  //  isLoading = false;

  constructor(public loaderService:loaderService ) { }

  ngOnInit(): void {
    // this.loaderService.loading$.subscribe((loading:any) => {
    //   this.isLoading = loading;
    // });
  }
}
