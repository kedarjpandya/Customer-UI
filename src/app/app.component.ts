import { Component } from '@angular/core';
import { Customer } from './models/Customer';
import { CustomerService } from './services/customer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CustomerApp.UI';
  customers: Customer[]=[];  
  customer?:Customer;
  constructor(private customerService:CustomerService){}

  ngOnInit(): void {
   this.customerService.getCustomers().subscribe((result:Customer[])=>(this.customers=result));
  }
  CreateNewCustomer()
  {
    this.customer=new Customer();

  }
  EditCustomer(customer:Customer)
  {
    this.customer=customer;
  }

  updateCustomerList(customers:Customer[])
  {
    this.customers=customers;
  }

}

