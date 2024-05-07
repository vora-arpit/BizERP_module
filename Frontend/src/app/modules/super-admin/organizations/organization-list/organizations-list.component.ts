import { Component, Input } from '@angular/core';
import { Organizations, SuperAdminService } from '../../../../core';

@Component({
  selector: 'app-organizations-list',
  templateUrl: './organizations-list.component.html',
  styleUrls: ['./organizations-list.component.scss']
})
export class OrganizationsListComponent {
  @Input() organizations: Organizations[];

  constructor(private superAdminService:SuperAdminService

  ){}

  ngOnInit():void{
    this.superAdminService.findAll().subscribe((result)=>{
      this.organizations = result;
      console.log("org",this.organizations);
    })
  }
}

// import { Component, Input } from '@angular/core';
// import { Organizations } from '../../../../core';

// @Component({
//   selector: 'app-organizations-list',
//   templateUrl: './organizations-list.component.html',
//   styleUrls: ['./organizations-list.component.scss']
// })
// export class OrganizationsListComponent {
//   @Input() organizations: Organizations[];

//   constructor() {}
// }


