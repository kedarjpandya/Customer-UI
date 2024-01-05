import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {CustomerService} from "../services/customer.service";
import {CustomersService} from "../customers.service";


@Component({
    selector: 'app-customer-add-edit',
    templateUrl: './customer-add-edit.component.html',
    styleUrls: ['./customer-add-edit.component.css']
})
export class CustomerAddEditComponent implements OnInit {

    customerForm: FormGroup;


    constructor(private customerService: CustomersService,
                private dialogRef: MatDialogRef<CustomerAddEditComponent>,
                private formBuilder: FormBuilder,
                @Inject(MAT_DIALOG_DATA) public data: any,) {
        this.customerForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', Validators.required],
            createdDate: ['', Validators.required],
            lastUpdatedDate: ['', Validators.required],
        });
    }

    ngOnInit(): void {
      this.customerForm.patchValue(this.data);
    }

    storeIdInSessionStorage(id: number): void {
        sessionStorage.setItem('userId', id.toString());
    }

  onSubmit() {
    if (this.customerForm.valid) {
      if (this.data) {
          this.storeIdInSessionStorage(this.data.id);
        this.customerService
            .updateCustomer(this.data.id, this.customerForm.value)
            .subscribe({
              next: (val: any) => {
                alert('Employee details updated!');

                this.dialogRef.close(true);
              },
              error: (err: any) => {
                console.error(err);
                alert("Error while updating the employee!");
              },
            });
      } else {
        this.customerService.addCustomer(this.customerForm.value).subscribe({
          next: (val: any) => {
          this.storeIdInSessionStorage(val.id);
            alert('Employee added successfully!');
            this.customerForm.reset();
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
            alert("Error while adding the employee!");
          },
        });
      }
    }
  }

}
