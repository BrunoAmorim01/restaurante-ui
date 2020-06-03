import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: './cadastro-rapido.component.html',
  styleUrls: ['./cadastro-rapido.component.scss']
})
export class CadastroRapidoComponent implements OnInit {
  form: FormGroup;

  constructor(public  dialogRef: MatDialogRef<CadastroRapidoComponent>,
              @Optional() @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {

  }

  onNoClick(): void {
    this.data.status = false;
    this.dialogRef.close(false);
  }

  onConfirmClick(): void {
    // this.data.status = true;
    // this.dialogRef.close();
    // this.dialogRef.close(true);
  }


}
