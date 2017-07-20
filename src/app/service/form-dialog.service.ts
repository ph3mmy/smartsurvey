import { Injectable } from '@angular/core';
import {MdDialog, MdDialogConfig, MdDialogRef} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import {FormDialogComponent} from '../component/form-dialog/form-dialog.component';
import {Router} from '@angular/router';
import {AppInfo} from '../model/AppInfo';


@Injectable()
export class FormDialogService {
  dialogRef: MdDialogRef<FormDialogComponent> | null;
  config = {
    disableClose: true,
    panelClass: 'custom-overlay-pane-class',
    backdropClass: '',
    width: '',
    height: '',
    position: {
      top: '',
      bottom: '',
      left: '',
      right: ''
    },
  };

  public hideShowStr: boolean;
  meeComp: AppInfo;


  constructor(public dialog: MdDialog, public router: Router) {
    this.hideShowStr = false;
  }
  openEmojiDialog() {
    this.dialogRef = this.dialog.open(FormDialogComponent, <MdDialogConfig>this.config);

    this.dialogRef.afterClosed()
      .subscribe(selection => {
        if (selection) {
          this.meeComp = selection;
          this.router.navigate(['question']);
        } else {
          // User clicked 'Cancel' or clicked outside the dialog
          this.hideShowStr = true;
        }
      });
  }
  getAppInfo() {
    return this.meeComp;
  }
}
