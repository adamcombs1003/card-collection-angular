import { Component, Inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { TwoButtonDialogData } from "../../models/two-button-dialog-data";


  @Component({
    selector: 'two-button-dialog',
    templateUrl: 'two-button-dialog.component.html',
    standalone: true,
    imports: [
      MatButtonModule,
      MatDialogModule
    ]
  })
  export class TwoButtonDialog {
    choice: boolean;
  
    constructor(
      public dialogRef: MatDialogRef<TwoButtonDialog>,
      @Inject(MAT_DIALOG_DATA) public data: TwoButtonDialogData,
    ) { }
  
  }