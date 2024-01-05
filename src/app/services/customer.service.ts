import { Injectable } from '@angular/core';
import { Customer } from '../models/Customer';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private Url="Customer"
  constructor(private http:HttpClient) { }

  public getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${environment.apiUrl}/${this.Url}`)
    }   
    public updateCustomers(customer:Customer): Observable<Customer[]> {
      return this.http.put<Customer[]>(`${environment.apiUrl}/${this.Url}`,customer)
      }   
      public createCustomers(customer:Customer): Observable<Customer[]> {
        return this.http.post<Customer[]>(`${environment.apiUrl}/${this.Url}`,customer)
        }   
        public deleteCustomers(customer:Customer): Observable<Customer[]> {
          return this.http.delete<Customer[]>(`${environment.apiUrl}/${this.Url}/${customer.customerId}`)
          }   

  }

