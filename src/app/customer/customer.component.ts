
import { Component, OnInit } from '@angular/core';
import {CustomerService} from "../services/customer.service";
import {Customer} from "../Model/Customer";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  constructor(private customerService: CustomerService , private fb:FormBuilder) { }
   customers !:Customer[];
  private errorMessage!: string

  searchCustomerForm !:FormGroup

  ngOnInit(): void {

    this.handelLoadingCustomers()

    this.searchCustomerForm = this.fb.group({
      keyword:this.fb.control(null)
    })
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

  handelSearchCustomerByName(){

    let kwObj=this.searchCustomerForm.value
    if (kwObj['keyword'] == null) this.handelLoadingCustomers()

      this.customerService.searchCustomers(kwObj['keyword']).subscribe({
        next:(data)=>{
          this.customers=data;

        },
        error:(err)=>{
          this.handelLoadingCustomers()        }
      })




}
}
