import { Injectable } from '@angular/core';
import {Headers, Http, RequestMethod, RequestOptions, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {AppModel} from '../model/AppModel';
import {OnCreateResponse} from '../component/question/question.component';

@Injectable()
export class AppInfoService {
  // headers: Headers;

  private url= 'http://34.211.211.38/smartsurvey_api/public/api/v1/Question';
  private appIdUrl= 'http://34.211.211.38/smartsurvey_api/public/api/v1/Question/';
  private headers;
  private options;
  constructor(protected http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
    this.options = new RequestOptions({
      headers: this.headers});
  }

  postJson(data: any): Observable<OnCreateResponse> {

    const body = JSON.stringify(data);
    return this.http.post(this.url, body, this.options)
      .map((res: Response) => res.json())
      .catch ((error: any) => Observable.throw(error.json));

  }
  getAppById(appId: any): Observable<AppModel> {

    const url = this.appIdUrl + appId;
    console.log('get url == ' + url);
    return this.http.get(url)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json() || 'Server error'));

  }

  deleteApp(appId: any): Observable<Response> {

    const url = this.appIdUrl + appId;
    return this.http.delete(url)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json() || 'Server error'));

  }

  updateApp(appId: any, data: any): Observable<Response> {

    const body = JSON.stringify(data);
    const url = this.appIdUrl + appId;
    return this.http.put(url, body, this.options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json() || 'Server error'));

  }

}
