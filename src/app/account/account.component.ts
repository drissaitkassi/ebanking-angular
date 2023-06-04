import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {OperationService} from "../services/operation.service";
import { AccountOperationDtolist, AccountOperations} from "../Model/AccountOperations";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  selectedForm !: string;
  versementForm! : FormGroup;
  retraitForm !: FormGroup;
  virementForm ! : FormGroup;
  searchAccountForm !: FormGroup;
  currentPage: number = 0;
  size  :number = 5;
  accountDetails !:AccountOperations;
  accountOperationDTOList ! : AccountOperationDtolist[]
  currentSearchedID : string =''

  constructor(private fb :FormBuilder , private opService:OperationService) { }

  ngOnInit(): void {


    //account form group
    this.searchAccountForm =this.fb.group({
      accountID:this.fb.control('')
    })
    // operations form groups

    this.versementForm=this.fb.group({
      "accountId":this.fb.control(''),
      "amount":this.fb.control(''),
      "description":this.fb.control(''),

    })


    this.retraitForm=this.fb.group({
      "accountId":this.fb.control(''),
      "amount":this.fb.control(''),
      "description":this.fb.control(''),

    })

    this.virementForm=this.fb.group({
      "accountId":this.fb.control(''),
      "amount":this.fb.control(''),
      "description":this.fb.control(''),
      "destinationAccountId":this.fb.control('')

    })

  }


  handelSearchAccount() {
    let id =this.searchAccountForm.value.accountID


    this.opService.getOperationsByAccount(id,this.currentPage,this.size).subscribe({
      next : (data)=>{
        this.accountDetails=data;
        this.currentSearchedID=data.accId
        this.accountOperationDTOList=data.accountOperationDTOList;
      },
      error :(err )=>console.log("error fetching ops")
    })

  }


  setCurrentPage(i: number) {
    this.currentPage=i;
    this.handelSearchAccount();
  }

  handelVersment() {

    this.versementForm.value.accountId=this.currentSearchedID
    this.opService.saveCreditOperation(this.versementForm.value).subscribe({
      next:(data)=>{
        console.log("sucess")
      },
      error:(err)=>{console.log("err")}
    })

  }

  handelRetrait() {

    this.retraitForm.value.accountId=this.currentSearchedID
    this.opService.saveDebitOperation(this.retraitForm.value).subscribe({
      next:(data)=>{
        console.log("sucess")
      },
      error:(err)=>{console.log("err")}
    })

  }

  handelVirement() {
    this.virementForm.value.accountId=this.currentSearchedID
    this.opService.saveTransferOperation(this.virementForm.value).subscribe({
      next:(data)=>{
        console.log("sucess")
      },
      error:(err)=>{console.log("err")}
    })
  }
}
