import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AccountOperation, AccountOperations} from "../Model/AccountOperations";
import * as http from "http";

@Injectable({
  providedIn: 'root'
})
export class OperationService {

  constructor(private http :HttpClient) { }


  public getOperationsByAccount(accountID : string, page:number,size :number) : Observable<AccountOperations>{
    return  this.http.get<AccountOperations>("http://localhost:8085/api/v1/bank/operations/"+accountID+"?page="+page+"&size="+size);

  }

  public saveCreditOperation(accountOperation: AccountOperation) : Observable<AccountOperation>{
    return  this.http.post<AccountOperation>("http://localhost:8085/api/v1/operations/credit",accountOperation);

  }
}
