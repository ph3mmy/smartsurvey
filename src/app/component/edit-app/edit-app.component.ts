import {Component, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewContainerRef} from '@angular/core';
import {QuestionModel} from '../../model/QuestionModel';
import {ActivatedRoute, Router} from '@angular/router';
import {AppInfoService} from '../../service/app-info.service';
import {AppModel} from '../../model/AppModel';
import {Subscription} from 'rxjs/Subscription';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastsManager} from 'ng2-toastr';

@Component({
  selector: 'app-edit',
  templateUrl: './edit-app.component.html',
  styleUrls: ['./edit-app.component.css']
})
export class EditAppComponent implements OnInit, OnChanges, OnDestroy {


  private mQModel: QuestionModel = new QuestionModel;
  private qModel: any;
  SelectionStatusOfQuestion: any[] = [];
  color: any;
  mmId: any;
  namee: string;
  busy: Subscription;
  uForm: FormGroup;
  name: string;
  colorNew: string;
  email: string;
  submitPending: boolean;

  private appInfo: AppModel;
  private newAppInfo: AppModel;
  private sub: any;

  constructor(private aRoute: ActivatedRoute, public mAppinfoService: AppInfoService,
              public fb: FormBuilder, private toastr: ToastsManager, vRef: ViewContainerRef, public router: Router) {
    this.mmId = aRoute.parent.snapshot.params['id'];
    this.toastr.setRootViewContainerRef(vRef);
    this.uForm = this.fb.group ({
      name: [null, Validators.required],
      email: [null, Validators.required]
      })
  }

  ngOnInit() {
    this.qModel = this.mQModel.mQuestion;
    this.submitPending = true;
    this.appInfo = new AppModel;
    this.newAppInfo = new AppModel;
    this.getAppDetail();
    this.color = this.appInfo.colour;
    console.log('the parent passed id == ' + this.mmId)
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getAppDetail();
    this.namee = this.appInfo.appname;
    this.color = this.appInfo.colour;
}

  ngOnDestroy(): void {
    if (this.busy != null) {
      this.busy.unsubscribe();
    }
  }

  updateForm() {
    const selecteds = Object.keys(this.SelectionStatusOfQuestion)
      .filter((item, index) => {
        return this.SelectionStatusOfQuestion[item];
      });
    this.newAppInfo.appname = this.name;
    this.newAppInfo.email = this.email;
    this.newAppInfo.colour = this.color;
    this.newAppInfo.appid = this.mmId;
    this.newAppInfo.questions = selecteds;
    this.busy = this.mAppinfoService.updateApp(this.mmId, this.newAppInfo)
      .subscribe(res => {
          this.submitPending = true;
          this.showSuccess('App successfully edited', 'success', this.mmId)
        },
        error => {
          this.showError('An Error Occurred, please check your network', 'error')
          this.submitPending = false;
          console.log('Error status code json = ' + error.json + ' \nerror status = ' + error.status);
          // this.loadAppInfo();
        })
  }


  imChecked() {
    let count = 0;
    Object.keys(this.SelectionStatusOfQuestion).forEach((item, index) => {
      if (this.SelectionStatusOfQuestion[item]) {
        count++;
      }
    });
    if (count > 0) {
      this.submitPending = false;
    } else {
      this.submitPending = true;
    }
  }


  onColorSelected(newColor: any) {
    console.log('selected color == ' + newColor);
  }

  getAppDetail() {
    this.busy = this.mAppinfoService.getAppById(this.mmId)
      .subscribe(mApp => {
        this.appInfo = mApp;
        this.namee = mApp.appname;
        console.log('app details question == ' + mApp.questions + ' name in dash == ' + this.namee)
        if (this.namee = '') {
          // this.loaded = true;
        }
      }, err => {
        console.log('app with id = ' + this.mmId + ' could not be loaded ' + ' error ' + err);
        // this.loaded = true;
      });
  }

  showSuccess(text: string, title: string, appId: any) {
    this.toastr.success(text, title, {toastLife: 3000, showCloseButton: false});
    setTimeout(() => {
      this.router.navigate(['dashboard', appId]);
    }, 4000);  // 5s
    // this.router.navigate(['']);
  }

  showError(text: string, title: string) {
    this.toastr.error(text, title);
  }

}
