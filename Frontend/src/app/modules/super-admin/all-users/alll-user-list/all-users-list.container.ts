import { OnInit, Component, OnDestroy } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { distinctUntilChanged, switchMap } from 'rxjs/operators';
import { SuperAdminService, User } from '../../../../core';

@Component({
  selector: 'app-user-list-container',
  template: `<app-all-users
  [users]="users"
  (filtered)="filter($event)"
  ></app-all-users>`
})
export class AllUserListContainer implements OnInit, OnDestroy {

  public users$: Observable<User> | undefined;

  users: User[] | undefined;
  filter$ = new Subject<string>();
  subscription: Subscription = new Subscription();

  constructor(
    private superAdminService: SuperAdminService
  ) { }

  ngOnInit() {
    this.subscription.add(
      this.filter$.pipe(
        //debounceTime(300),
        distinctUntilChanged(),
        switchMap(text => this.superAdminService.findAllUsers(text))
      ).subscribe(
        results => this.users = results
      )
    )
    this.filter$.next('')
  }

  filter(text: string) {
    this.filter$.next(text);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
} 
