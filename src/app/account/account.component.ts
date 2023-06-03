import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {OperationService} from "../services/operation.service";
import {AccountOperationDtolist, AccountOperations} from "../Model/AccountOperations";

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
  totalPgaes !: number;
  currentPage: number = 0;
  size  :number = 5;
  accountDetails !:AccountOperations;
  accountOperationDTOList ! : AccountOperationDtolist[]

  constructor(private fb :FormBuilder , private opService:OperationService) { }

  ngOnInit(): void {


    //account form group
    this.searchAccountForm =this.fb.group({
      accountID:this.fb.control('')
    })
    // operations form groups

    this.versementForm=this.fb.group({
      "mntVersement":this.fb.control(''),
      "numCompte":this.fb.control(''),

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
          this.accountOperationDTOList=data.accountOperationDTOList;
      },
      error :(err )=>console.log("error fetching ops")
    })

  }


  setCurrentPage(i: number) {
    this.currentPage=i;
    this.handelSearchAccount();
  }
}
