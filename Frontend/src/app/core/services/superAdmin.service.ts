import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Organizations, User } from '../models';
import { environment } from '../../../environments/environment.development';

@Injectable()
export class SuperAdminService {

  private rootPath = `${environment.API_BASE_URL}/superadmin`;

  constructor(private http: HttpClient) { }

  findAll(): Observable<Organizations[]> {
    return this.http.get<Organizations[]>(`${this.rootPath}/org`).pipe(
      catchError(this.handleError)
    );
  }

  findById(orgid: bigint): Observable<Organizations> {
    return this.http.get<Organizations>(`${this.rootPath}/org/${orgid}`);
  }


  create(organization: Organizations): Observable<Organizations> {
    return this.http.post<Organizations>(`${this.rootPath}/org`, organization);
  }

  update( orgid: bigint,organization: Organizations): Observable<Organizations> {
    return this.http.put<Organizations>(`${this.rootPath}/org/${orgid}`, organization);
  }

  delete(orgid: bigint): Observable<void> {
    return this.http.delete<void>(`${this.rootPath}/org/${orgid}`);
  }

  findAllUsers(text: string): Observable<User[]> {
    console.log("text", text)
    return this.http.get<User[]>(`${this.rootPath}/allUsers?filter=${text}`).pipe(
      catchError(this.handleError)
    );
  }

  findUSerById(id: bigint): Observable<User> {
    return this.http.get<User>(`${this.rootPath}/allUsers/${id}`);
  }

  private handleError(error: any) {
    console.error("An error occurred", error); // For demo purposes only
    return throwError(error.message || "Server error");
  }

  newuser(name: string, email: string, password: string,organizationId:bigint) {
    return this.http.post<{
      success: boolean;
      message: string;
    }>(`${this.rootPath}/makeuser`, { name, email, password ,organizationId});
  }
}
