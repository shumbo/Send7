import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Api provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Api{
  constructor(private http:Http){
    
  }
  head(appno){
    let info = this.http.get(`https://api.push7.jp/api/v1/${appno}/head`);
    return info;
  }
  send(appno,payload){
    let post = this.http.post(`https://api.push7.jp/api/v1/${appno}/send`,payload);
    return post;
  }
}

