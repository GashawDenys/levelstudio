import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {AbstractControl, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.css']
})
export class SignUpFormComponent{
  @ViewChild('password') password: any;

  emailControl = new FormControl("", [
    Validators.required,
    Validators.email
  ]);
  passwordControl = new FormControl("", [
    Validators.required,
    Validators.minLength(5)
  ]);
  passwordConfirmControl = new FormControl("", [
    Validators.required,
    (control: AbstractControl) => {
      return control.value === this.password?.nativeElement?.value ? null : {equalityDisrupted: {value: control.value}};
    }
  ]);
  formControls = [
    this.emailControl,
    this.passwordControl,
    this.passwordConfirmControl
  ]

  constructor(public dialogRef: MatDialogRef<SignUpFormComponent>) {
  }

  onClose() {
    this.dialogRef.close();
  }

  onConfirm() {
    this.formControls.forEach(control => control.markAsTouched())
    // @ts-ignore
    if(!this.formControls.some(control => control.invalid)){
      this.dialogRef.close();
    }
  }
}