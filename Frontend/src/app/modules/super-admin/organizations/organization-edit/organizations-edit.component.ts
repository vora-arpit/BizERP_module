import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService, Organizations, SuperAdminService } from '../../../../core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-organizations-edit',
  templateUrl: './organizations-edit.component.html',
  styleUrls: ['./organizations-edit.component.scss']
})
export class OrganizationsAddEditComponent implements OnInit {
  @Input() organization: Organizations | null = null; // Changed type to Organizations | null
  @Output() save = new EventEmitter<Organizations>();

  organizationForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private superAdminService: SuperAdminService,
    private notificationService: NotificationService,private router:Router
  ) {
    this.organizationForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['']
    });
  }

  ngOnInit(): void {
    if (this.organization) {
      this.superAdminService.findById(this.organization.id).subscribe((result: Organizations) => {
        this.organization = result;
        this.organizationForm.patchValue({
          name: this.organization.name,
          description: this.organization.description
        });
      });
    }
  }
  

  onSubmit() {
    if (this.organizationForm.valid) {
      const formData = this.organizationForm.value;
      const newOrganization: Organizations = {
        id: this.organization ? this.organization.id : undefined,
        name: formData.name,
        description: formData.description // Corrected property name here
      };

      console.log('Organization data:', newOrganization); // Print organization data to console

      if (this.organization) {
        // If organization exists, update it
        this.superAdminService.update(this.organization.id, newOrganization).subscribe(
          (updatedOrganization: Organizations) => {
            this.save.emit(updatedOrganization);
          }
        );
      } else {
        // If organization doesn't exist, create it
        this.superAdminService.create(newOrganization).subscribe(
          (createdOrganization: Organizations) => {
            this.save.emit(createdOrganization);
          }
        );
      }
    }
  }

  canceled() {
    this.router.navigate(['/superadmin/organizations']);  
  }

  confirmDelete(){
    if (!this.organization) {
      this.notificationService.showError('Cannot delete customer without id.');
      return;
    }

    // this.store.dispatch(deleteCustomer({ id: BigInt(this.customerId) }));
    this.superAdminService.delete(this.organization.id);
    this.notificationService.showSuccess('Customer deleted successfully.');
  }
}
