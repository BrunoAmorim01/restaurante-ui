import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SnackBarMessageService {

  constructor(private _snackBar: MatSnackBar) { }

  openSnackbar(msg:string){
    this._snackBar.open(msg, 'OK', {
      duration: 10000,
    });
  }
}
