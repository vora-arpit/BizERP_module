import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {
  submitted = false;
  resetForm: FormGroup;
  generatedVerificationCode: number;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.resetForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.pattern("^(?=.*[A-Z])(?=.*[^A-Za-z0-9])[A-Za-z\\d\\S]{8,}$")]],
      password1: ['', [Validators.required,Validators.pattern("^(?=.*[A-Z])(?=.*[^A-Za-z0-9])[A-Za-z\\d\\S]{8,}$")]]
    });
  }
  get f() { return this.resetForm.controls; }
 onSubmit(){

 }
}
