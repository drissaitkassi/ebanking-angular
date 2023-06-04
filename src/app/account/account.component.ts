import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {OperationService} from "../services/operation.service";
import {AccountOperation, AccountOperationDtolist, AccountOperations} from "../Model/AccountOperations";

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
  // totalPgaes !: number;
  currentPage: number = 0;
  size  :number = 5;
  accountDetails !:AccountOperations;
  accountOperationDTOList ! : AccountOperationDtolist[]
  versementOperationPayload !: AccountOperation
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
      "mntRetrait":this.fb.control(''),
      "numCompte":this.fb.control(''),

    })

    this.virementForm=this.fb.group({
      "mntVirement":this.fb.control(''),
      "numCompteDebit":this.fb.control(''),
      "numCompteCredit":this.fb.control(''),

    })

  }

  handelSearchAccount() {
    let id =this.searchAccountForm.value.accountID


    this.opService.getOperationsByAccount(id,this.currentPage,this.size).subscribe({
      next : (data)=>{
        this.accountDetails=data;
        this.currentSearchedID=data.accId
        console.log(this.currentSearchedID)
        console.log(data.accId)
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


    // {
    //   "accountId": "acc433bb-fc73-43a0-9a81-3430feaa27de",
    //   "amount":6669,
    //   "description": "test versment"
    // }

    this.versementForm.value.accountId=this.currentSearchedID
    console.log(this.versementForm.value)

    this.opService.saveCreditOperation(this.versementForm.value).subscribe({
      next:(data)=>{
        console.log(data)
        console.log("sucess")
      },
      error:(err)=>{console.log("err")}
    })

  }
}
