import {Component, OnInit, OnChanges, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MdDialog} from '@angular/material';
import {AppInfoService} from '../../service/app-info.service';
import {FormDialogService} from '../../service/form-dialog.service';


declare var swal: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnChanges, OnDestroy {



  private mId: any;

  constructor(aRoute: ActivatedRoute, public appInfoService: AppInfoService,
              public fdservice: FormDialogService, public dialog: MdDialog, public router: Router) {
    this.mId = aRoute.snapshot.params['id'];
  }

  ngOnChanges() {
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
  }

}
