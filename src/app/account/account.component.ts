import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

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

  constructor(private fb :FormBuilder) { }

  ngOnInit(): void {
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

}
