import { Component, OnInit } from '@angular/core';
import {MdDialogRef} from '@angular/material';
import {AppInfoService} from '../../service/app-info.service';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

  public confirmMessage: string;

  constructor(public cDialogRef: MdDialogRef<ConfirmDialogComponent>, public appInfoService: AppInfoService) { }

  ngOnInit() {
  }


}
