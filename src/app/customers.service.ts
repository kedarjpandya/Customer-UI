import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CustomersService {


  baseUrl: string = "https://localhost:7269/api/";

  constructor(private httpClient: HttpClient) {}

  addCustomer(data: any): Observable<any> {
    return this.httpClient.post(this.baseUrl + 'customer', data);
  }

  updateCustomer(id: number, data: any): Observable<any> {
    data.id=id;
    return this.httpClient.put(this.baseUrl + `customer/`, data);
  }

  getCustomerList(): Observable<any> {
    return this.httpClient.get(this.baseUrl + 'customer');
  }

  deleteCustomer(id: number): Observable<any> {
    return this.httpClient.delete(this.baseUrl + `customer/${id}`);
  }
}
