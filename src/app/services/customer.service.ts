import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Customer} from "../Model/Customer";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http :HttpClient) { }


  LoadCustomers():Observable<Customer[]>{
   return  this.http.get<Customer[]>("http://localhost:8085/customers")
  }

  addCustomer(customer :Customer):Observable<Customer>{
    return  this.http.post<Customer>("http://localhost:8085/customers",customer)
  }

  searchCustomers(kw: String):Observable<Customer[]> {
    return this.http.get<Customer[]>("http://localhost:8085/customers/search/"+kw)
  }
}
