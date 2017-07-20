import {ChangeDetectionStrategy, Component, HostListener, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MdDialog, MdDialogRef} from '@angular/material';
import {AppInfo} from '../../model/AppInfo';
import {ColorModel} from '../../model/ColorModel';


@Component({
  moduleId: 'module.id',
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormDialogComponent implements OnInit {
  rForm: FormGroup;
  private color: string;
  public myAppComponent: AppInfo;
  private colorModel: ColorModel;
  colorArr: any[];
  // public userEmaile: FormControl;

  constructor(public dialogRef: MdDialogRef<FormDialogComponent>, public fb: FormBuilder) {
    this.rForm = this.fb.group({
      appNamee: [null, Validators.required],
      appColore: [{disabled: true}, Validators.required],
      userEmaile: [null, [Validators.required, Validators.pattern('[^ @]*@[^ @]*')]],
    // ]);
    });
    this.color = '';
  }
  public ngOnInit() {
    // this.userEmaile = new FormControl('', [Validators.required, Validators.pattern('[^ @]*@[^ @]*')]);
    this.myAppComponent = new AppInfo;
    this.colorModel = new ColorModel;
    this.colorArr = this.colorModel.colorArray;

  }
  public saveForm() {
    // do the business logic
    this.dialogRef.close(this.myAppComponent);
    const mm = this.dialogRef.afterClosed().map(res => res.json);
    console.log(this.myAppComponent.appColore);
    console.log('sub mm inside form dia == ' + mm);
  }

  setColor(colorValue: any) {
    this.color = colorValue;
    this.myAppComponent.appColore = colorValue;
  }

}


