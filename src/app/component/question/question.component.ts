import {Component, Inject, OnDestroy, OnInit, Type, ViewContainerRef} from '@angular/core';
import {AppInfo} from '../../model/AppInfo';
import {Question} from '../../question.interface';
import {FormDialogService} from '../../service/form-dialog.service';
import {AppInfoService} from '../../service/app-info.service';
import {ToastsManager, Toast} from 'ng2-toastr';
import {Router} from '@angular/router';
import {QuestionModel} from '../../model/QuestionModel';
import {Subscription} from 'rxjs/Subscription';

export class OnCreateResponse {
  status: string;
  appid: string;
}

@Component({
  moduleId: 'module.id',
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit, OnDestroy {


  mmC: AppInfo;
  formcc: FormDialogService;
  retAppi: AppInfo;
  respObj: OnCreateResponse;
  surveyUrl: string;
  submitPending: boolean;
  SelectionStatusOfMutants: any[] = [];
  busy: Subscription;
  // SelectionStatusOfMutants: any = {};
  public qquestions: QuestionModel;
  questions: any;

  constructor(private fdService: FormDialogService,
              private appInfoService: AppInfoService,
              private toastr: ToastsManager, vRef: ViewContainerRef, private router: Router) {
    this.toastr.setRootViewContainerRef(vRef);
  }

  ngOnInit() {
    this.mmC = new AppInfo;
    this.mmC.hasValue = false;
    this.submitPending = true;
    this.qquestions = new QuestionModel;
    this.questions = this.qquestions.mQuestion;
    this.retAppi = new AppInfo;
    this.respObj = new OnCreateResponse;
    this.surveyUrl = 'http://34.211.211.38/smartsurvey_api/public/api/v1/Question';
  }

  imChecked() {
    let count = 0;
    Object.keys(this.SelectionStatusOfMutants).forEach((item, index) => {
      if (this.SelectionStatusOfMutants[item]) {
        count++;
      }
    });
    if (count > 0) {
      this.submitPending = false;
    } else {
      this.submitPending = true;
    }
  }

  updateOptions() {
    this.submitPending = true;
    const selecteds = Object.keys(this.SelectionStatusOfMutants)
      .filter((item, index) => {
        return this.SelectionStatusOfMutants[item];
      });
    this.mmC = this.fdService.getAppInfo();
    this.mmC.question = selecteds;
    console.log('color logger = ' + this.mmC.appColore)
    this.retrievePosted();

  }

  retrievePosted() {
    this.busy = this.appInfoService.postJson({
      'email': this.mmC.userEmaile,
      'appname': this.mmC.appNamee, 'colour': this.mmC.appColore,
      'questions': this.mmC.question
    }).subscribe(res => {
        this.submitPending = true;
        this.showSuccess('We are creating your App, we will get back to you when we are done', 'success', res.appid)
      },
      error => {
        this.showError('An Error Occurred, please check your network', 'error')
        this.submitPending = false;
        console.log('Error status code json = ' + error.json + ' \nerror status = ' + error.status);
        // this.loadAppInfo();
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

  ngOnDestroy(): void {
    if (this.busy != null) {
      this.busy.unsubscribe();
    }
  }

}
