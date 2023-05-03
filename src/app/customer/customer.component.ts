import { Component, OnInit } from '@angular/core';
import {CustomerService} from "../services/customer.service";
import {Customer} from "../Model/Customer";

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  constructor(private customerService: CustomerService) { }
   customers !:Customer[];
  private errorMessage!: string
  ngOnInit(): void {

    this.handelLoadingCustomers()
  }
  handelLoadingCustomers(){
    this.customerService.LoadCustomers().subscribe({
      next:(data)=>{
        this.customers=data;
      },
      error:(err)=>{
        console.log(" failed to load cusomers")
      }
    })
  }
}
