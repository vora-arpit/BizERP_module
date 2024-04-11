import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-forbidden',
  template: `
    <img src="/assets/images/logo1.svg" alt="Logo" height="50px">
    <h1>Site</h1>
    <h2>403 - You are not authorized to see this page.</h2>
    <button class="btn btn-primary" (click)="login()"><mat-icon>arrow_back</mat-icon></button>
  `
})
export class ForbiddenComponent implements OnInit {
  returnUrl!: string; 
  constructor(private router:Router,private route:ActivatedRoute){}
  
  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  
  login(){
    this.router.navigate([this.returnUrl]);
  }
}