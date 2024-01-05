import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Customer } from 'src/app/models/Customer';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {
  @Input() customer?: Customer;
  @Output() modifiedcustomer=new EventEmitter<Customer[]>();

  constructor(private customerservice: CustomerService ) { }

  ngOnInit(): void {
  }
  updateCustomer(customer: Customer)
  {
    customer.lastUpdatedDate=new Date().toISOString();
     this.customerservice.updateCustomers(customer).subscribe((customers:Customer[])=>this.modifiedcustomer.emit(customers));
  }
  deleteCustomer(customer: Customer)
  {
    this.customerservice.deleteCustomers(customer).subscribe((customers:Customer[])=>this.modifiedcustomer.emit(customers));

  }
  createCustomer(customer: Customer)
  {
    customer.createdDate=new Date().toISOString();
    customer.lastUpdatedDate=new Date().toISOString();
    this.customerservice.createCustomers(customer).subscribe((customers:Customer[])=>this.modifiedcustomer.emit(customers));
  }

}
