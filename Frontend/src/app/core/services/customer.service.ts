import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Customer } from '../models';
import { environment } from '../../../environments/environment.development';

@Injectable()
export class CustomerService {

  private rootPath = `${environment.API_BASE_URL}/customers`;

  constructor(private http: HttpClient) { }

  findById(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.rootPath}/${id}`);
  }

  findAll(text: any): Observable<[Customer]> {
    return this.http.get<[Customer]>(`${this.rootPath}?filter=${text}`).pipe(
      tap(response => console.log('Response from findAll:', response))
    );
  }
  

  create(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(`${this.rootPath}`, customer);
  }

  update(id: number, customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(`${this.rootPath}/${id}`, customer);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.rootPath}/${id}`);
  }

  printAllCustomers(): void {
    this.findAll('').subscribe(
      customers => {
        console.log('All customers:', customers);
      },
      error => {
        console.error('Error fetching customers:', error);
      }
    );
  }
}
