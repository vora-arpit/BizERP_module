import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import {User, SuperAdminService } from '../../../core';

@Injectable()
export class AllUsersResolver implements Resolve<Observable<User>>{

  constructor(private SuperAdminService: SuperAdminService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    const id = route.paramMap.get('id');
    if (id !== null) {
      return this.SuperAdminService.findUSerById(BigInt(id));
    } else {
      // Handle the case where 'id' is null, for example, by redirecting to an error page
      // You can return an Observable of null or throw an error
      throw new Error('User ID is missing in the route parameters');
    }
  }
}
