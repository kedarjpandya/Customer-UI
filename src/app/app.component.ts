import {Component, ViewChild} from '@angular/core';
import { Customer } from './models/Customer';
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {CustomerAddEditComponent} from "./customer-add-edit/customer-add-edit.component";
import {MatDialog} from "@angular/material/dialog";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {CustomersService} from "./customers.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CustomerApp.UI';
  // customers: Customer[]=[];
  customer?:Customer;

  @ViewChild(MatTable) mytable: MatTable<Customer[]>;

  columns: string[] = ['fname', 'lname','mail','cdate','ldate'];


  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private customerService:CustomersService,private dialog: MatDialog,){}

  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'email',
    'createdDate',
      'lastUpdatedDate',
      'action'
  ];

  ngOnInit(): void {
    this.getCustomerList();
  }


  openAddEditCustomerDialog() {
    const dialogRef = this.dialog.open(CustomerAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getCustomerList();
        }
      },
    });
  }

  getCustomerList() {
    this.customerService.getCustomerList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  deleteCustomer(id: number) {
    let confirm = window.confirm("Do you want to delete this Customer?");
    if(confirm) {
      this.customerService.deleteCustomer(id).subscribe({
        next: (res) => {
          alert('Customer deleted!');
          this.getCustomerList();
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  openEditForm(data: any) {
    const dialogRef = this.dialog.open(CustomerAddEditComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          console.log(val)
          console.log('this')
          this.getCustomerList();
        }
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getUserIdFromSessionStorage(): string | null {
    return sessionStorage.getItem('userId');
  }

  changeBg(row:any):boolean {
    return row.id == this.getUserIdFromSessionStorage();
  }



  // isLastRow(row: any): boolean {
  //   return row === this.customers[this.customers.length - 1];
  // }

}

