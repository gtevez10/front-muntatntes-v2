import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Heroe } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-mat-dialog',
  templateUrl: './mat-dialog.component.html',
  styles: [
  ]
})
export class MatDialogComponent implements OnInit {

  constructor( private dialogRef: MatDialogRef<MatDialogComponent>,
               @Inject(MAT_DIALOG_DATA) public data: Heroe ) { }

  ngOnInit(): void {
    console.log(this.data)
  }

  borrar(){
    this.dialogRef.close( true );

  }

  cerrar(){
    this.dialogRef.close();

  }

}
