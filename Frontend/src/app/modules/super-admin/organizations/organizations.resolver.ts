import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Organizations, SuperAdminService } from '../../../core';

@Injectable({
  providedIn: 'root'
})
export class OrganizationsResolver implements Resolve<Organizations[]> {
  constructor(private superadminService: SuperAdminService) {}

  resolve(): Observable<Organizations[]> {
    return this.superadminService.findAll();
  }
}
