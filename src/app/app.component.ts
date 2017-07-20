import {Component, OnInit, Input} from '@angular/core';
import {Question} from './question.interface';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {FormDialogService} from './service/form-dialog.service';
import {FormDialogComponent} from './component/form-dialog/form-dialog.component';
import {MdDialogRef} from '@angular/material';
import {AppInfo} from './model/AppInfo';

/*class AppInfo {
  name: string;
  // id: number;
}*/
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // appInfo: AppInfo;
  mComp: AppInfo;
  private color: string;
  hideShowStr: boolean;
  myForm: FormGroup;
  fdComp: FormDialogComponent;
  mref: MdDialogRef<FormDialogComponent>;
  cForm: FormGroup;
  imagePath: string;
  name: '';
  public result: any;

  ngOnInit() {
    // this.appInfo = new AppInfo;
    this.mComp = new AppInfo;
    this.mComp.hasValue = false;
    console.log('inside app comp' + this.mComp.hasValue)
    // this.fdComp = new FormDialogComponent(this.mref, new FormBuilder );
  }


  onHideShow() {
    this.hideShowStr = true;
  }

  onMySubmit() {
    console.log('Form Data: ');
  }

  constructor(fb: FormBuilder) {
    this.myForm = fb.group({
      name: [null, Validators.required],
    });
    this.imagePath = '/assets/dark_bg.png';
  }


}

/*
swal({
  title: "Are you sure you want to delete your account?",
  text: "If you are sure, type in your password:",
  type: "input",
  inputType: "password",
  showCancelButton: true,
  closeOnConfirm: false
}, function(typedPassword) {

  if (typedPassword === "") {
    swal.showInputError("You need to type in your password in order to do this!");
    return false;
  }

  $.ajax({
    url: "/api/delete-account",
    data: { password: typedPassword },
    type: "POST"
  })
    .done(function(data) {
      swal("Deleted!", "Your account has been deleted!", "success");
    })
    .error(function(data) {
      swal.showInputError("Your password is wrong!");
    });
});*/
