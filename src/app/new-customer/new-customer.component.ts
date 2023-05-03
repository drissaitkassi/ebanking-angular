import { Component, OnInit } from '@angular/core';
import {CustomerService} from "../services/customer.service";
import {Customer} from "../Model/Customer";
import {FormBuilder, FormGroup, FormControl} from "@angular/forms";

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.css']
})
export class NewCustomerComponent implements OnInit {


  constructor(private customerService : CustomerService , private fb :FormBuilder) { }


  newCustomerForm! : FormGroup

  ngOnInit(): void {

    this.newCustomerForm=this.fb.group({
      name:this.fb.control(null),
      email:this.fb.control(null)
    })
  }

 /* testCustomer : Customer ={
    id: 0,
    name: "add from angular",
    email: "addangula@email.com"
  }*/



  handelAddCustomer(){
    console.log("im clicked")
    this.customerService.addCustomer(this.newCustomerForm.value).subscribe({
      next:(data)=>console.log("successfully added"),
      error:(err)=>console.log("failed to add customers")
    })
  }
}
