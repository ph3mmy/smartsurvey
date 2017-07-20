import {Component, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AppInfoService} from '../../service/app-info.service';
import {FormDialogService} from '../../service/form-dialog.service';
import {MdDialog, MdDialogConfig, MdDialogRef} from '@angular/material';
import {AppModel} from '../../model/AppModel';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';
import {Subscription} from 'rxjs/Subscription';


declare var swal: any;
@Component({
  selector: 'app-dashboardroot',
  templateUrl: './dashboardroot.component.html',
  styleUrls: ['./dashboardroot.component.css']
})
export class DashboardrootComponent implements OnInit, OnChanges, OnDestroy {


  private mId: any;
  private appInfo: AppModel;
  loaded: boolean;
  initializing: boolean;
  namee: any;
  private sub: any;
  busy: Subscription;
  private config = {
    disableClose: true,
    panelClass: 'custom-overlay-pane-class',
    width: '300px',
    height: '200px'
  };

  private dialogRef: MdDialogRef<ConfirmDialogComponent>;

  constructor(public aRoute: ActivatedRoute, public appInfoService: AppInfoService,
              public fdservice: FormDialogService, public dialog: MdDialog, public router: Router) {
    this.mId = aRoute.parent.snapshot.params['id'];
  }

  ngOnChanges() {
    this.getAppDetail();
  }

  ngOnInit() {
    this.appInfo = new AppModel;
    this.loaded = false;
    this.initializing = true;
    console.log('name on init == ' + this.namee);
    // this.getAppDetail();
    this.busy = this.appInfoService.getAppById(this.mId)
      .subscribe(mApp => {
        this.appInfo = mApp;
        this.namee = mApp.appname;
        if (this.namee = '') {
          this.loaded = true;
        }
      }, err => {
        this.loaded = true;
      });
  }

  ngOnDestroy(): void {
    if (this.busy != null) {
      this.busy.unsubscribe();
    }
  }


  editWithId() {
    this.router.navigate(['edit'], {relativeTo: this.aRoute.parent});
  }

  // open create app dialog
  public openMyDialog() {
    this.fdservice.openEmojiDialog();
  }

  getAppDetail() {
    this.sub = this.appInfoService.getAppById(this.mId)
      .subscribe(mApp => {
        this.appInfo = mApp;
        this.namee = mApp.appname;
        if (this.namee = '') {
          this.loaded = true;
          this.initializing = false;
        }
      }, err => {
        this.loaded = true;
      });
  }

  // open confirm delete dialog
  openConfirmationDialog() {
    const mm = this;
    this.dialogRef = this.dialog.open(ConfirmDialogComponent, <MdDialogConfig>this.config);
    this.dialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';

    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // do confirmation actions
        this.busy = this.appInfoService.deleteApp(this.mId)
          .subscribe(res => {
            swal('Deleted!', 'App successfully deleted.', 'success');
            mm.getAppDetail();
            // TODO: reload page on successful deletion
            mm.router.navigate(['dashboard', mm.mId]);
          }, err => {
            swal('Error!', 'Request could not be completed', 'error');
          });
      }
      this.dialogRef = null;
    });
  }
}
