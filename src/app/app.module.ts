import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {
  MdButtonModule, MdCheckboxModule, MdToolbarModule, MdCardModule, MdInputModule,
  MdDialogModule, MdGridListModule
} from '@angular/material';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import 'hammerjs';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MdNativeDateModule} from '@angular/material';
import {HttpModule} from '@angular/http';
import {AppComponent} from './app.component';
import {FormDialogComponent} from './component/form-dialog/form-dialog.component';
import {FormDialogService} from './service/form-dialog.service';
import {QuestionComponent} from './component/question/question.component';
import {RouterModule} from '@angular/router';
import {AppInfoService} from './service/app-info.service';
import {StartButtonComponent} from './component/start-button/start-button.component';
import {AppInfo} from './model/AppInfo';
import { ToastModule, ToastOptions } from 'ng2-toastr';
import { CustomOption } from './custom-option';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import {
  ColorPickerModule, ColorPickerService, DialogComponent, SliderDirective,
  TextDirective
} from 'angular4-color-picker';
import { ConfirmDialogComponent } from './component/confirm-dialog/confirm-dialog.component';
import { EditAppComponent } from './component/edit-app/edit-app.component';
import { DashboardrootComponent } from './component/dashboardroot/dashboardroot.component';
import {BusyModule} from 'angular2-busy';

@NgModule({
  declarations: [
    AppComponent,
    FormDialogComponent,
    ConfirmDialogComponent,
    QuestionComponent,
    StartButtonComponent,
    DashboardComponent,
    ConfirmDialogComponent,
    EditAppComponent,
    DashboardrootComponent
  ],
  imports: [
    BrowserModule,
    MdButtonModule,
    MdToolbarModule,
    MdCheckboxModule,
    MdInputModule,
    NoopAnimationsModule,
    MdCardModule,
    FormsModule,
    HttpModule,
    MdNativeDateModule,
    ReactiveFormsModule,
    MdDialogModule,
    MdGridListModule,
    ColorPickerModule,
    BusyModule,
    ToastModule.forRoot(),
    RouterModule.forRoot([
      {
        path: '',
        component: StartButtonComponent
      },
      {
        path: 'question',
        component: QuestionComponent
      },
      {
        path: 'dashboard/:id',
        component: DashboardComponent,
        children: [
          {path: '', redirectTo: 'view', pathMatch: 'full'},
          {path: 'view', component: DashboardrootComponent},
          {path: 'edit', component: EditAppComponent},
        ]
      }
    ])
  ],
  exports: [MdButtonModule, MdCheckboxModule, MdToolbarModule],
  providers: [FormDialogService, AppInfoService, AppInfo, ColorPickerService, {provide: ToastOptions, useClass: CustomOption}],
  entryComponents: [FormDialogComponent, ConfirmDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
