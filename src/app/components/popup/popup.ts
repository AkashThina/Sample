import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-popup',
  imports: [MatDialogModule,CommonModule],
  templateUrl: './popup.html',
  styleUrl: './popup.css',
})
export class Popup {
 constructor(
    public dialogRef: MatDialogRef<Popup>,
    @Inject(MAT_DIALOG_DATA) public data: { isTrue:string ,title: string; message: string }
  ) {}

  close(){
    this.dialogRef.close();
  }
}
