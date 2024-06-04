import { Component, Inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { AddCardDialogData } from "../../models/add-card-dialog-data";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { FormControl, FormGroup, FormGroupDirective, FormsModule, NgForm, ReactiveFormsModule, Validators } from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";
import { Card } from "../../models/card";

/** Error when invalid control is dirty, touched, or submitted. */
export class FormErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'add-card-dialog',
  templateUrl: 'add-card-dialog.component.html',
  standalone: true,
  styleUrl: './add-card-dialog.component.scss',
  imports: [
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule
  ]
})
export class AddCardDialog {
  addCardRequest: Card = new Card();
  firstName = "";
  lastName = "";
  year = "";
  sport = "";
  manufacturer = "";
  subSet = "";
  psaValue = 0;
  manufacturers = [
    "Topps",
    "Donruss",
    "Leaf",
    "Fleer",
    "Upper Deck",
    "Score",
    "Skybox",
    "Ultra"
  ];

  addCardForm = new FormGroup({
    firstNameFormControl: new FormControl('', [Validators.required]),
    lastNameFormControl: new FormControl('', [Validators.required]),
    yearFormControl: new FormControl('', [Validators.required, Validators.minLength(4)]),
    psaValueFormControl: new FormControl('', [Validators.required, Validators.pattern("^[+-]?[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$")])
  });

  matcher = new FormErrorStateMatcher();

  constructor(
    public dialogRef: MatDialogRef<AddCardDialog>,
    @Inject(MAT_DIALOG_DATA) public data: AddCardDialogData,
  ) { }

  closeDialog() {
    this.addCardRequest = {
      _id: Math.floor(Math.random() * (1000000)).toString(),
      firstName: this.firstName,
      lastName: this.lastName,
      year: this.year,
      sport: this.sport,
      manufacturer: this.manufacturer,
      subSet: this.subSet,
      psaValue: this.psaValue
    }
    console.log(this.addCardRequest);

    this.dialogRef.close(this.addCardRequest);
  }

}
