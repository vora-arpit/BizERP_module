import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment.development";
import { User } from "../models";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class ProfileSettingService
{
    private ITEM_KEY = 'currentUser';

    private rootPath = `${environment.API_BASE_URL}/profile`;
    private currentUserSubject: BehaviorSubject<User>;


    constructor(private http:HttpClient) {
        
    }
    updateProfile(user: User): Observable<User> {
    return this.http.put<User>(`${this.rootPath}/setting`, user)
    // .pipe(
    //   tap(updatedUser => {
    //     // Update the current user data
    //     localStorage.setItem(this.ITEM_KEY, JSON.stringify(updatedUser));
    //     this.currentUserSubject.next(updatedUser);
    //   })
    // );
 }

 update(id: number, user: User): Observable<User> {
  return this.http.put<User>(`${this.rootPath}/${id}`, user);
}
}