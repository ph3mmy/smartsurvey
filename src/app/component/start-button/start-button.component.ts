import { Component, OnInit } from '@angular/core';
import {FormDialogService} from '../../service/form-dialog.service';

@Component({
  selector: 'app-start-button',
  templateUrl: './start-button.component.html',
  styleUrls: ['./start-button.component.css']
})
export class StartButtonComponent implements OnInit {

  constructor(public fService: FormDialogService) { }

  ngOnInit() {
  }
  public openMyDialog() {
    this.fService
      .openEmojiDialog();
  }

}
