import { OnInit, Component } from '@angular/core';
@Component({
  selector: 'app-not-found',
  template: `
    <img src="/assets/images/logo1.svg" alt="Logo" height="200px">
    <h1>Site</h1>
    <h2>404 - The requested page was not found.</h2>
  `
})
export class NotFoundComponent implements OnInit {
  
  ngOnInit() {

  }
}